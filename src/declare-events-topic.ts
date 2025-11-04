import type { z } from 'zod/v4';

export type Topic<S extends z.ZodType, N extends string = string> = Readonly<{ name: N; schema: S }>;

export const declareEventsTopic = <S extends z.ZodType, N extends string>(name: N, schema: S): Topic<S, N> =>
  ({
    name,
    schema,
    // Type: `$type$` as z.infer<typeof schema>,
  }) as const;
