export function convertZodToJsonSchema(schema: unknown) {
	if (!schema) {
		return undefined;
	}

	if (typeof schema === "object" && schema !== null) {
		return { type: "object" };
	}

	return undefined;
}
