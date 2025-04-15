import { once } from './once';

type EnvEntry<K extends string, V> = { key: K; parse: (s: unknown) => V };

export const createEnvParser = <Q extends EnvEntry<string, unknown>, T extends Record<string, Q>>(
  envSchemaDescription: T
) => {
  type EnvSchemaDescription = typeof envSchemaDescription;
  type ParsedEnv = {
    [K in keyof EnvSchemaDescription]: ReturnType<EnvSchemaDescription[K]['parse']>;
  };

  return (env: Record<string, string | undefined> = process.env) => {
    const result: Partial<ParsedEnv> = {};
    for (const [k, v] of Object.entries(envSchemaDescription)) {
      Object.defineProperty(result, k, {
        get() {
          return once(this, k, true, v.parse(env[v.key]));
        },
        configurable: true,
        enumerable: true,
      });
    }
    return result as ParsedEnv;
  };
};
