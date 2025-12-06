import { describe, expect, it } from "vitest";
import { buildMarketingPrompt, parseMarketingResponse } from "./ai";

describe("parseMarketingResponse", () => {
	it("extracts structured marketing fields from a mixed response", () => {
		const raw =
			'Sure, here you go: {"headline":"Bold Move","bodyCopy":"This is the campaign copy.","keywords":["growth","launch","bold","premium","fast"]}';
		const result = parseMarketingResponse(raw);

		expect(result.headline).toBe("Bold Move");
		expect(result.bodyCopy).toBe("This is the campaign copy.");
		expect(result.keywords).toHaveLength(5);
		expect(result.keywords[0]).toBe("growth");
	});

	it("throws when fields are missing", () => {
		const raw = '{"headline":"Only headline"}';
		expect(() => parseMarketingResponse(raw)).toThrow();
	});
});

describe("buildMarketingPrompt", () => {
	it("includes custom context when provided", () => {
		const prompt = buildMarketingPrompt({ description: "Seasonal launch" });
		expect(prompt).toContain("Seasonal launch");
		expect(prompt).toContain("Return strictly valid JSON");
	});
});
