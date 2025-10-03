import { z } from 'zod/v4';

export const declareEventsTopic = <Name extends string, Schema extends z.ZodType>(
  name: Name,
  schema: Schema
): {
  name: Name;
  schema: typeof schema;
  // Type: z.infer<typeof schema>;
} =>
  ({
    name,
    schema,
    // Type: `$type$` as z.infer<typeof schema>,
  }) as const;
