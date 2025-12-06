export type MarketingResult = {
	headline: string;
	bodyCopy: string;
	keywords: string[];
	posterImage?: string;
};

export function parseMarketingResponse(raw: string): MarketingResult {
	const match = raw.match(/\{[\s\S]*\}/);
	if (!match) {
		throw new Error("Unable to parse response from Anthropic.");
	}
	const parsed = JSON.parse(match[0]);
	const headline =
		typeof parsed.headline === "string" ? parsed.headline.trim() : "";
	const bodyCopy =
		typeof parsed.bodyCopy === "string"
			? parsed.bodyCopy.trim()
			: typeof parsed.body === "string"
				? parsed.body.trim()
				: "";
	const keywords = Array.isArray(parsed.keywords)
		? parsed.keywords.map((keyword) => String(keyword).trim()).filter(Boolean)
		: [];

	if (!headline || !bodyCopy || keywords.length === 0) {
		throw new Error("Missing required fields from Anthropic response.");
	}

	return { headline, bodyCopy, keywords };
}

export function buildMarketingPrompt({
	description,
}: {
	description?: string;
}): string {
	const trimmedDescription = description?.trim();
	const descriptionLine = trimmedDescription
		? `Context: ${trimmedDescription}`
		: "Context: No additional notes provided.";

	return [
		"You are a marketing strategist crafting concise assets from a single hero image.",
		descriptionLine,
		"Return strictly valid JSON with keys: headline (<=80 chars), bodyCopy (<=120 words), keywords (exactly 5 short phrases).",
		"Tone: campaign-ready, benefit-led, consumer facing.",
		"Do not include explanations, only JSON.",
	].join(" ");
}

export async function readFileAsDataUrl(
	file: File,
): Promise<{ dataUrl: string; mediaType: string }> {
	return await new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const result = typeof reader.result === "string" ? reader.result : "";
			const commaIndex = result.indexOf(",");
			const dataUrl = commaIndex >= 0 ? result.slice(commaIndex + 1) : result;
			resolve({ dataUrl, mediaType: file.type || "image/jpeg" });
		};
		reader.onerror = () => reject(new Error("Failed to read the file."));
		reader.readAsDataURL(file);
	});
}
