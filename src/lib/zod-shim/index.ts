import * as realZod from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export * from "zod";
export { ZodFirstPartyTypeKind } from "zod";
export const toJSONSchema = zodToJsonSchema;
export default { ...realZod, toJSONSchema };
