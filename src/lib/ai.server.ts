import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenAI } from "@google/genai";
import { createServerFn } from "@tanstack/react-start";
import { buildMarketingPrompt, parseMarketingResponse } from "./ai";

export const generateMarketing = createServerFn({ method: "POST" })
	.inputValidator(
		(d: { description?: string; dataUrl: string; mediaType: string }) => d,
	)
	.handler(async ({ data }) => {
		const client = new Anthropic({
			apiKey: process.env.ANTHROPIC_API_KEY,
		});

		const response = await client.messages.create({
			model: "claude-sonnet-4-5-20250929",
			max_tokens: 1024,
			messages: [
				{
					role: "user",
					content: [
						{
							type: "text",
							text: buildMarketingPrompt({ description: data.description }),
						},
						{
							type: "image",
							source: {
								type: "base64",
								media_type: data.mediaType as
									| "image/jpeg"
									| "image/png"
									| "image/gif"
									| "image/webp",
								data: data.dataUrl,
							},
						},
					],
				},
			],
		});

		const textContent = response.content.find((block) => block.type === "text");
		if (!textContent || textContent.type !== "text") {
			throw new Error("No text response from Anthropic");
		}

		const marketingResult = parseMarketingResponse(textContent.text);

		if (data.description) {
			const ai = new GoogleGenAI({
				apiKey: process.env.GOOGLE_AI_STUDIO_API_KEY || "",
			});

			const imagePrompt = `Create a professional marketing poster based on this description: ${data.description}

Campaign details:
Headline: ${marketingResult.headline}
Body Copy: ${marketingResult.bodyCopy}
Keywords: ${marketingResult.keywords.join(", ")}

The poster should be visually striking, modern, and suitable for social media advertising.`;

			try {
				console.log("Generating poster with description...");
				const imageResponse = await ai.models.generateContent({
					model: "gemini-2.5-flash-image",
					contents: imagePrompt,
				});

				const imagePart = imageResponse.candidates?.[0]?.content?.parts?.find(
					(part) => part.inlineData,
				);

				if (imagePart?.inlineData?.data) {
					marketingResult.posterImage = `data:image/png;base64,${imagePart.inlineData.data}`;
					console.log("Poster generated successfully");
				} else {
					console.log("No image data, using uploaded image");
					marketingResult.posterImage = `data:${data.mediaType};base64,${data.dataUrl}`;
				}
			} catch (error) {
				console.error("Failed to generate poster:", error);
				marketingResult.posterImage = `data:${data.mediaType};base64,${data.dataUrl}`;
			}
		} else {
			marketingResult.posterImage = `data:${data.mediaType};base64,${data.dataUrl}`;
		}

		return marketingResult;
	});
