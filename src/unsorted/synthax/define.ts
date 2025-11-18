import { maxBy, sortedLastIndexBy, thru } from 'lodash';

import { isROArray } from '../../core/checks';
import { samplesBy } from '../../core/collections/array-utils';
import { makeMatchingTree, notNull } from '../../core/index';
import { aggregation } from '../../core/numbers/aggregation';
import { AnyAnyFunction } from '../../core/types';
import {
  AnyAst,
  Dictionary,
  PipeFn,
  ProcessorCtx,
  Tokenizer,
  TokenizerResult,
  ValueOrGetter,
} from './tokenizer-def';
import { CodePointsBuilder } from './util/code-points-builder';

const indexFoundOr = (n: number, fallback: () => number) => (n < 0 ? fallback() : n);

class UnmatchedError extends Error {
  readonly ctx: ProcessorCtx;

  constructor(ctx: ProcessorCtx) {
    super(`unmatched error`);
    this.ctx = { ...ctx };
  }

  get message() {
    const { ctx } = this;
    const s = indexFoundOr(ctx.input.indexOf('\n', ctx.pos), () => 0);
    const e = indexFoundOr(ctx.input.lastIndexOf('\n', ctx.pos), () => ctx.input.length);
    return `unexpected '${ctx.input.slice(ctx.pos, ctx.pos + 1)}' at pos ${ctx.pos}
${ctx.input.slice(s, e)}
${samplesBy(ctx.pos - s, () => ' ').join('')}^
`;
  }
}

type NotReadonly<T> = {
  -readonly [P in keyof T]: T[P];
};

const defineTokenizer = <InAst extends AnyAst, OutAst extends AnyAst>(
  tokenize: (ctx: ProcessorCtx) => Pick<TokenizerResult<InAst>, `length` | `result`>,
  pipeFn: PipeFn<InAst, OutAst>
): Tokenizer<OutAst> => {
  const pipe = <OutAst2 extends AnyAst>(newAst: PipeFn<OutAst, OutAst2>): Tokenizer<OutAst2> =>
    defineTokenizer(tokenize, (data, info) => newAst(pipeFn(data, info), info));

  const ret = Object.assign(pipe, {
    pipe,
    mute: () => defineTokenizer(tokenize, () => null),
    tokenize: (ctx: ProcessorCtx): TokenizerResult<OutAst> => {
      const data = tokenize(ctx);
      const ret = { ...data, pos: ctx.pos, source: ctx.input };
      return { ...ret, result: pipeFn(data.result, ret) };
    },
    maybe: (): Tokenizer<{ item: OutAst | null | undefined }> => {
      return $t.maybe(ret);
    },
  } as const);

  return ret;
};

const singleCodePointTokenizer = (
  check: (cp: number | undefined) => cp is number
): Tokenizer<{ cp: number }> => {
  return defineTokenizer(
    ctx => {
      const cp = ctx.input.codePointAt(ctx.pos);
      if (check(cp)) {
        return { length: 1, result: cp } as const;
      }
      throw new UnmatchedError(ctx);
    },
    cp => ({ cp })
  );
};

const scpt1 = (codePoint: number): Tokenizer<{ cp: number }> =>
  singleCodePointTokenizer((cp): cp is number => codePoint === cp);

const scpt2 = (codePoints: ReadonlySet<number>): Tokenizer<{ cp: number }> =>
  singleCodePointTokenizer((cp): cp is number => cp !== undefined && codePoints.has(cp));

const codePointsTokenizer = (cps: readonly number[] | ReadonlySet<number>): Tokenizer<{ cp: number }> =>
  isROArray(cps)
    ? cps.length === 1
      ? scpt1(cps[0])
      : thru(new Set(cps), cps => scpt2(cps))
    : cps.size === 1
      ? scpt1([...cps][0])
      : scpt2(cps);

const unwrap = <T extends AnyAst | AnyAst[]>(
  t: ValueOrGetter<Tokenizer<T> | TokenizerFabric<T, T>>
): Pick<Tokenizer<T>, `tokenize`> => {
  if (`tokenize` in t) {
    return t;
  }
  const r = typeof t === `function` ? t() : t;
  return `tokenize` in r ? r : r.create(o => o);
};

type ExtractNotArray<T> = Exclude<T, Extract<T, readonly unknown[]>>;

type TokenizerFabric<InTokens extends AnyAst, OutAst extends AnyAst> = {
  create: (ast: PipeFn<InTokens, OutAst>) => Tokenizer<OutAst>;
};

export type AstFromTokenizer<T> = T extends { tokenize: AnyAnyFunction<{ result: infer R }> }
  ? R
  : T extends () => infer TT
    ? AstFromTokenizer<TT>
    : never;

export type MapTokensInputArrayToAst<Rest> = Rest extends readonly [infer E, ...infer R]
  ? readonly [AstFromTokenizer<E>, ...(R extends { length: 0 } ? [] : MapTokensInputArrayToAst<R>)]
  : never;

export const $t = {
  run: <Ast extends AnyAst>(
    input: string,
    tokenizer: Tokenizer<Ast>,
    options?: { allowPartial: boolean }
  ) => {
    const ctx: ProcessorCtx = { input, pos: 0 };
    const r = tokenizer.tokenize(ctx);
    if (!options?.allowPartial && r.length !== input.length) {
      throw new Error(`partially matched, rest: ${input.slice(r.length, r.length + 30)}...`);
    }
    return r;
  },

  cp(apply: (b: CodePointsBuilder) => unknown) {
    const b = new CodePointsBuilder();
    apply(b);
    return codePointsTokenizer(b.cps);
  },

  cps(cps: string) {
    return codePointsTokenizer(Array.from(cps, s => s.codePointAt(0)!));
  },

  cpRanges(ranges: readonly [number, number][]) {
    return singleCodePointTokenizer((cp): cp is number => {
      if (cp === undefined) {
        return false;
      }
      const idx = sortedLastIndexBy(ranges, [cp, Number.POSITIVE_INFINITY] as const, r => r[0]);
      if (idx === 0) {
        return false;
      }

      const [start, end] = ranges[idx - 1];
      return cp >= start && cp <= end;
    });
  },

  /**
   * Builds a matching tree for keywords and tries to match the longest possible keyword
   * (e.g. [`some`, `someone`] will try to match `someone` first and then will fall back to `some`)
   * @param keywords some set (iterable) of strings to match with
   */
  keywords(keywords: Iterable<string>) {
    const { match } = makeMatchingTree(keywords);
    return defineTokenizer(
      ctx => {
        const m = match(ctx.input, ctx.pos);
        if (m !== undefined) {
          return {
            length: m.length,
            result: m,
          };
        }
        throw new UnmatchedError(ctx);
      },
      match => ({ match })
    );
  },

  notCps(cps: string) {
    const set = new Set(Array.from({ length: cps.length }, (_, i) => cps.codePointAt(i)!));
    return singleCodePointTokenizer((cp): cp is number => cp !== undefined && !set.has(cp));
  },

  not<InAst extends ExtractNotArray<AnyAst>>(tokenizer: ValueOrGetter<Tokenizer<InAst>>) {
    return defineTokenizer(
      inCtx => {
        const ctx: NotReadonly<ProcessorCtx> = { ...inCtx };

        try {
          unwrap(tokenizer).tokenize(ctx);
        } catch (error) {
          if (error instanceof UnmatchedError) {
            const cp = inCtx.input.codePointAt(inCtx.pos);

            return { length: 1, result: notNull(cp, () => `unexpected end of input`) };
          }
          throw error;
        }
        throw new UnmatchedError(inCtx);
      },
      cp => ({ cp })
    );
  },

  eof() {
    return defineTokenizer(
      ctx => {
        if (ctx.pos === ctx.input.length) {
          return { length: 0, result: undefined };
        }
        throw new UnmatchedError(ctx);
      },
      () => null as never
    );
  },

  look<InAst extends ExtractNotArray<AnyAst>>(tokenizer: ValueOrGetter<Tokenizer<InAst>>) {
    return defineTokenizer(
      inCtx => {
        const ctx: NotReadonly<ProcessorCtx> = { ...inCtx };

        if (unwrap(tokenizer).tokenize(ctx).length) {
          return { length: 0, result: undefined };
        }
        throw new UnmatchedError(inCtx);
      },
      () => null as never
    );
  },

  seq<
    InTokenizers extends readonly ValueOrGetter<
      Tokenizer<AnyAst | AnyAst[]> | TokenizerFabric<AnyAst, AnyAst>
    >[],
  >(...tokenizers: InTokenizers) {
    return defineTokenizer(
      inCtx => {
        const ctx: NotReadonly<ProcessorCtx> = { ...inCtx };
        const matches = tokenizers.map(t => {
          const r = unwrap(t).tokenize(ctx);
          ctx.pos += r.length;
          return r;
        });

        return {
          length: aggregation.sum(matches.map(m => m.length)),
          result: matches,
        };
      },
      matches => matches.map(m => m.result) as /* TODO */ MapTokensInputArrayToAst<InTokenizers>
    );
  },

  /**
   * Tries to match tokenizers sequentially in passed order unless one of them has success. So it works by
   * the "first match winner" strategy like "A / B" PUG-rule.
   *
   * @param tokenizers
   */
  or<InTokenizers extends ValueOrGetter<Tokenizer<AnyAst>>>(tokenizers: readonly InTokenizers[]) {
    return defineTokenizer(
      ctx => {
        const errors: UnmatchedError[] = [];
        for (const t of tokenizers) {
          try {
            return unwrap(t).tokenize(ctx) as /* TODO */ TokenizerResult<AstFromTokenizer<InTokenizers>>;
          } catch (error) {
            if (error instanceof UnmatchedError) {
              errors.push(error);
              continue;
            }
            throw error;
          }
        }
        throw maxBy(errors, e => e.ctx.pos) || new UnmatchedError(ctx);
      },
      forward => forward
    );
  },

  repeat<InAst extends ExtractNotArray<AnyAst>>(
    tokenizer: ValueOrGetter<Tokenizer<InAst>>,
    min: number,
    max?: number
  ) {
    return defineTokenizer(
      inCtx => {
        const matches: TokenizerResult<InAst>[] = [];

        const ctx: NotReadonly<ProcessorCtx> = { ...inCtx };

        for (; max == null || matches.length < max; ) {
          try {
            const r = unwrap(tokenizer).tokenize(ctx);
            matches.push(r);
            ctx.pos += r.length;
          } catch (error) {
            if (error instanceof UnmatchedError) {
              if (matches.length < min || (max != null && matches.length > max)) {
                throw new UnmatchedError(inCtx);
              }
              break;
            } else {
              throw error;
            }
          }
        }

        return {
          length: aggregation.sum(matches.map(m => m.length)),
          result: matches,
        };
      },
      matches => matches.map(m => m.result)
    );
  },

  maybe<InAst extends AnyAst>(tokenizer: ValueOrGetter<Tokenizer<InAst>>) {
    return defineTokenizer(
      inCtx => {
        const ctx: NotReadonly<ProcessorCtx> = { ...inCtx };

        try {
          const { length, result } = unwrap(tokenizer).tokenize(ctx);
          return { length, result };
        } catch (error) {
          if (error instanceof UnmatchedError) {
            return { length: 0, result: undefined };
          } else {
            throw error;
          }
        }
      },
      item => ({ item })
    );
  },

  failure(message: string) {
    return defineTokenizer(
      (): { length: number; result: null } => {
        throw new Error(`$t.failure: ${message}`);
      },
      /* istanbul ignore next */
      () => null as never
    );
  },
};

export const $o = {
  ops: <O extends Dictionary, Q extends readonly { symbol?: string; description: string }[]>(
    options: O,
    ...defs: Q
  ): (O & Q[number])[] => defs.map(d => ({ ...options, ...d }) as const),

  op: <S extends string, Q extends string | undefined, Uid extends string | undefined>(
    description: S,
    symbol: Q,
    uid?: Uid,
    requireSpaces?: boolean
  ) => ({ symbol, description, uid, requireSpaces }) as const,

  ltr: <A extends number>(a: A) => ({ args: a, ltr: true }) as const,
  rtl: <A extends number>(a: A) => ({ args: a, ltr: false }) as const,

  unary: <S extends string | undefined>(s: S, requireSpaces?: boolean) =>
    ({ description: `${s}a`, symbol: s, requireSpaces }) as const,
  binary: <S extends string | undefined>(s: S, requireSpaces?: boolean) =>
    ({ description: `a ${s} b`, symbol: s, requireSpaces }) as const,
};

export const $u = {
  mute: (): null => null,
  nodeText: (ast: Omit<TokenizerResult<AnyAst>, `result`>) => ast.source.slice(ast.pos, ast.pos + ast.length),
};

export const locationInfo = ({ pos, length }: TokenizerResult<unknown>) => ({ pos, length });

export const rawSpan =
  <T extends Dictionary>(fn: (data: string) => T) =>
  (ast: unknown, info: TokenizerResult<unknown>) =>
    fn($u.nodeText(info));

export type InferTokenizer<T> = T extends Tokenizer<infer U> ? U : never;
export const testParser = <Ast extends AnyAst>(
  input: string,
  tokenizer: Tokenizer<Ast>,
  expectation: Omit<TokenizerResult<Ast>, `source` | `pos`>
) => {
  expect($t.run(input, tokenizer, { allowPartial: true })).toStrictEqual({
    source: input,
    pos: 0,
    ...expectation,
  });
};
