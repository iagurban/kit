import Ajv from 'ajv/dist/jtd';
import { JTDDataType, JTDSchemaType } from 'ajv/lib/types/jtd-schema';

const ajv = new Ajv();

type HashDef<
  P extends Readonly<Record<string, AnyDef>>,
  O extends Readonly<Record<string, AnyDef>>,
  A extends boolean
> = {
  properties?: P;
} & (A extends true
  ? {
      optionalProperties: O;
    }
  : never) & { additionalProperties?: boolean };

type AnyHashDef = {
  readonly properties?: Readonly<Record<string, AnyDef>>;
  readonly optionalProperties?: Readonly<Record<string, AnyDef>>;
  readonly additionalProperties?: boolean;
};

export type AnyDef =
  | { readonly type: string; readonly nullable?: boolean }
  | { readonly elements: AnyDef }
  | { readonly enum: readonly string[] }
  | { readonly discriminator: string; readonly mapping: Readonly<Record<string, AnyHashDef>> }
  | { readonly values: string[] }
  | AnyHashDef;

export const JTD = {
  props: <T extends JTDDataType<unknown>>(o: T) => o,

  partial: {
    req: <P extends Record<string, AnyDef>>(
      properties: Readonly<P>
    ): { readonly properties: Readonly<P>; readonly additionalProperties: true } =>
      ({ properties, additionalProperties: true } as const),

    opt: <P extends Record<string, AnyDef>>(
      optionalProperties: Readonly<P>
    ): { readonly optionalProperties: Readonly<P>; readonly additionalProperties: true } =>
      ({ optionalProperties, additionalProperties: true } as const),

    full: <P extends Record<string, AnyDef>, O extends Record<string, AnyDef>>(
      properties: Readonly<P>,
      optionalProperties: Readonly<O>
    ): {
      readonly properties: Readonly<P>;
      readonly optionalProperties: Readonly<O>;
      readonly additionalProperties: true;
    } => ({ properties, optionalProperties, additionalProperties: true } as const),
  } as const,

  req: <P extends Record<string, AnyDef>>(properties: Readonly<P>): { readonly properties: P } =>
    ({ properties } as const),

  opt: <P extends Record<string, AnyDef>>(
    optionalProperties: Readonly<P>
  ): { readonly optionalProperties: Readonly<P> } => ({ optionalProperties } as const),

  full: <P extends Record<string, AnyDef>, O extends Record<string, AnyDef>>(
    properties: Readonly<P>,
    optionalProperties: Readonly<O>
  ): {
    readonly properties: Readonly<P>;
    readonly optionalProperties: Readonly<O>;
  } => ({ properties, optionalProperties } as const),

  array: <P extends AnyDef>(elements: P): { readonly elements: P } => ({ elements } as const),

  enum: <P extends string>(_enum: readonly P[]): { readonly enum: P[] } => ({ enum: [..._enum] }),

  get string() {
    return { type: 'string' } as const;
  },

  // get float() {
  //   return { type: 'float' } as const;
  // },

  get uint32() {
    return { type: 'uint32' } as const;
  },

  get bool() {
    return { type: 'boolean' } as const;
  },

  compileParser: <S extends AnyDef>(schema: S) => {
    const parse = ajv.compileParser(schema);
    return (data: string) => {
      const result = parse(data);
      if (!result) {
        const { message, position } = parse;
        console.dir({ message, position, data });
        throw new Error(
          (message || '[UNKNOWN]') +
            (position == null ? '' : ` (at [${data.slice(position, position + 50)}])`)
        );
      }
      return result as JTDDataType<S>;
    };
  },

  compileValidator: <T>(schema: JTDSchemaType<T>) => ajv.compile<T>(schema),
} as const;
