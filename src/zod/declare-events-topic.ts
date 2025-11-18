import type { z } from 'zod/v4';

/**
 * Represents a Topic with a unique name and an associated schema.
 *
 * @template S The Zod schema type associated with the topic.
 * @template N The name of the topic, defaults to string if not specified.
 *
 * @property {N} name The unique name identifying the topic.
 * @property {S} schema The Zod schema defining the structure or validation rules for the topic's content.
 */
export type Topic<S extends z.ZodType, N extends string = string> = Readonly<{ name: N; schema: S }>;

/**
 * Declares an event topic with the specified name and schema.
 *
 * @template S - The Zod schema type used to validate the event topic's data.
 * @template N - A string representing the name of the event topic.
 * @param {N} name - The name of the event topic.
 * @param {S} schema - The schema used to validate the event topic's data.
 * @returns {Topic<S, N>} An object representing the event topic, including its name and validation schema.
 */
export const declareEventsTopic = <S extends z.ZodType, N extends string>(name: N, schema: S): Topic<S, N> =>
  ({
    name,
    schema,
    // Type: `$type$` as z.infer<typeof schema>, // unfortunately, your ts types compiler will die :(
  }) as const;
