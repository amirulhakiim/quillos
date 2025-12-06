import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenAI } from "@google/genai";
import { createServerFn } from "@tanstack/react-start";
import type { PlatformAssets } from "./assets";

export const generateAllAssets = createServerFn({ method: "POST" }).handler(
	async ({
		data,
	}: {
		data: {
			headline: string;
			bodyCopy: string;
			keywords: string[];
		};
	}) => {
		const anthropic = new Anthropic({
			apiKey: process.env.ANTHROPIC_API_KEY,
		});

		const ai = new GoogleGenAI({
			apiKey: process.env.GOOGLE_AI_STUDIO_API_KEY || "",
		});

		const { headline, bodyCopy, keywords } = data;

		const copyPrompt = `You are a marketing copywriter. Based on this campaign:
Headline: ${headline}
Body Copy: ${bodyCopy}
Keywords: ${keywords.join(", ")}

Generate variations for different platforms. Return ONLY valid JSON with this structure:
{
  "facebookHeadlines": [5 headlines optimized for Facebook, each max 40 chars],
  "facebookPrimaryTexts": [5 primary texts for Facebook, each max 125 chars],
  "instagramHeadlines": [5 headlines optimized for Instagram, each max 40 chars],
  "instagramPrimaryTexts": [5 captions for Instagram, each max 125 chars],
  "googleHeadlines": [5 headlines for Google Ads, each max 30 chars],
  "googleDescriptions": [5 descriptions for Google Ads, each max 90 chars]
}`;

		const copyResponse = await anthropic.messages.create({
			model: "claude-sonnet-4-5-20250929",
			max_tokens: 2048,
			messages: [
				{
					role: "user",
					content: copyPrompt,
				},
			],
		});

		const textContent = copyResponse.content.find(
			(block) => block.type === "text",
		);
		if (!textContent || textContent.type !== "text") {
			throw new Error("No text response from Anthropic");
		}

		const match = textContent.text.match(/\{[\s\S]*\}/);
		if (!match) {
			throw new Error("Unable to parse copy response");
		}
		const copyData = JSON.parse(match[0]);

		async function generateImage(
			prompt: string,
			aspectRatio: string,
		): Promise<string> {
			const fullPrompt = `${prompt}. Create in ${aspectRatio} aspect ratio. Professional marketing poster style.`;
			try {
				const response = await ai.models.generateContent({
					model: "gemini-2.5-flash-image",
					contents: fullPrompt,
				});

				const imagePart = response.candidates?.[0]?.content?.parts?.find(
					(part) => part.inlineData,
				);

				if (imagePart?.inlineData?.data) {
					return `data:image/png;base64,${imagePart.inlineData.data}`;
				}
				return "";
			} catch (error) {
				console.error(`Failed to generate ${aspectRatio} image:`, error);
				return "";
			}
		}

		const baseImagePrompt = `Professional marketing poster: ${headline}. ${bodyCopy}. Keywords: ${keywords.join(", ")}. Modern, striking, suitable for social media.`;

		const [
			fbSquare,
			fbVertical,
			fbLandscape,
			igSquare,
			igVertical,
			igPortrait,
			googleMedRect,
			googleLeader,
			googleSkyscraper,
			googleLargeRect,
		] = await Promise.all([
			generateImage(baseImagePrompt, "1:1 square"),
			generateImage(baseImagePrompt, "9:16 vertical"),
			generateImage(baseImagePrompt, "1.91:1 landscape"),
			generateImage(baseImagePrompt, "1:1 square"),
			generateImage(baseImagePrompt, "9:16 vertical"),
			generateImage(baseImagePrompt, "4:5 portrait"),
			generateImage(baseImagePrompt, "300x250 medium rectangle"),
			generateImage(baseImagePrompt, "728x90 leaderboard"),
			generateImage(baseImagePrompt, "160x600 wide skyscraper"),
			generateImage(baseImagePrompt, "336x280 large rectangle"),
		]);

		const assets: PlatformAssets = {
			facebook: {
				images: {
					square: fbSquare,
					vertical: fbVertical,
					landscape: fbLandscape,
				},
				headlines: copyData.facebookHeadlines || [],
				primaryTexts: copyData.facebookPrimaryTexts || [],
			},
			instagram: {
				images: {
					square: igSquare,
					vertical: igVertical,
					portrait: igPortrait,
				},
				headlines: copyData.instagramHeadlines || [],
				primaryTexts: copyData.instagramPrimaryTexts || [],
			},
			google: {
				banners: {
					mediumRectangle: googleMedRect,
					leaderboard: googleLeader,
					wideSkyscraper: googleSkyscraper,
					largeRectangle: googleLargeRect,
				},
				headlines: copyData.googleHeadlines || [],
				descriptions: copyData.googleDescriptions || [],
			},
		};

		return assets;
	},
);
