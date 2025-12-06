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

		const ai = new GoogleGenAI({
			apiKey: process.env.GOOGLE_AI_STUDIO_API_KEY || "",
		});

		const imagePrompt = `Create a professional marketing poster for a campaign with the following details:
Headline: ${marketingResult.headline}
Body Copy: ${marketingResult.bodyCopy}
Keywords: ${marketingResult.keywords.join(", ")}

The poster should be visually striking, modern, and suitable for social media advertising. Include the headline prominently in the design.`;

		try {
			console.log("Starting image generation with Gemini...");
			const imageResponse = await ai.models.generateContent({
				model: "gemini-2.5-flash-image",
				contents: imagePrompt,
			});

			console.log("Image generation response received");
			console.log(
				"Response structure:",
				JSON.stringify(imageResponse, null, 2),
			);

			const imagePart = imageResponse.candidates?.[0]?.content?.parts?.find(
				(part) => part.inlineData,
			);

			console.log("Image part found:", !!imagePart);
			console.log("Has inline data:", !!imagePart?.inlineData?.data);

			if (imagePart?.inlineData?.data) {
				marketingResult.posterImage = `data:image/png;base64,${imagePart.inlineData.data}`;
				console.log("Poster image added to result");
			} else {
				console.log("No image data in response");
			}
		} catch (error) {
			console.error("Failed to generate image:", error);
			if (error instanceof Error) {
				console.error("Error details:", error.message);
				console.error("Error stack:", error.stack);
			}
		}

		return marketingResult;
	});
