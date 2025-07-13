import { maxBy, thru } from 'lodash';

import { isROArray } from '../core/checks';
import { aggregation } from '../numbers/aggregation';
import { samplesBy } from '../utils/array-utils';
import { makeMatchingTree } from '../utils/string-util';
import { AnyAnyFunction } from '../utils/types';
import { CodePointsBuilder } from './code-points-builder';
import {
  AnyAst,
  Dictionary,
  PipeFn,
  ProcessorCtx,
  Tokenizer,
  TokenizerResult,
  ValueOrGetter,
} from './tokenizer-def';

const indexFoundOr = (n: number, fallback: () => number) => (n < 0 ? fallback() : n);

class UnmatchedError extends Error {
  constructor(readonly ctx: ProcessorCtx) {
    const s = indexFoundOr(ctx.input.indexOf('\n', ctx.pos), () => 0);
    const e = indexFoundOr(ctx.input.lastIndexOf('\n', ctx.pos), () => ctx.input.length);
    super(`unexpected '${ctx.input.slice(ctx.pos, ctx.pos + 1)}' at pos ${ctx.pos}
${ctx.input.slice(s, e)}
${samplesBy(ctx.pos - s, () => ' ').join('')}^
`);
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

  return Object.assign(pipe, {
    pipe,
    mute: () => defineTokenizer(tokenize, () => null),
    tokenize: (ctx: ProcessorCtx): TokenizerResult<OutAst> => {
      const data = tokenize(ctx);
      const ret = { ...data, pos: ctx.pos, source: ctx.input };
      return { ...ret, result: pipeFn(data.result, ret) };
    },
  } as const);
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

  seq<
    InTokens extends readonly ValueOrGetter<Tokenizer<AnyAst | AnyAst[]> | TokenizerFabric<AnyAst, AnyAst>>[],
  >(...tokens: InTokens) {
    return defineTokenizer(
      inCtx => {
        const ctx: NotReadonly<ProcessorCtx> = { ...inCtx };
        const matches = tokens.map(t => {
          const r = unwrap(t).tokenize(ctx);
          ctx.pos += r.length;
          return r;
        });

        return {
          length: aggregation.sum(matches.map(m => m.length)),
          result: matches,
        };
      },
      matches => matches.map(m => m.result) as /* TODO */ MapTokensInputArrayToAst<InTokens>
    );
  },
  or<InTokens extends ValueOrGetter<Tokenizer<AnyAst>>>(tokens: readonly InTokens[]) {
    return defineTokenizer(
      ctx => {
        const errors: UnmatchedError[] = [];
        for (const t of tokens) {
          try {
            return unwrap(t).tokenize(ctx) as /* TODO */ TokenizerResult<AstFromTokenizer<InTokens>>;
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
    token: ValueOrGetter<Tokenizer<InAst>>,
    min: number,
    max?: number
  ) {
    return defineTokenizer(
      inCtx => {
        const matches: TokenizerResult<InAst>[] = [];

        const ctx: NotReadonly<ProcessorCtx> = { ...inCtx };

        for (;;) {
          try {
            const r = unwrap(token).tokenize(ctx);
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
  maybe<InAst extends AnyAst>(token: ValueOrGetter<Tokenizer<InAst>>) {
    return defineTokenizer(
      inCtx => {
        const ctx: NotReadonly<ProcessorCtx> = { ...inCtx };

        try {
          const { length, result } = unwrap(token).tokenize(ctx);
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
      () => null
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
    uid?: Uid
  ) => ({ symbol, description, uid }) as const,

  ltr: <A extends number>(a: A) => ({ args: a }) as const,
  rtl: <A extends number>(a: A) => ({ args: a, ltr: false }) as const,

  unary: <S extends string | undefined>(s: S) => ({ description: `${s}a`, symbol: s }) as const,
  binary: <S extends string | undefined>(s: S) => ({ description: `a ${s} b`, symbol: s }) as const,
};

export const $u = {
  mute: (): null => null,
  nodeText: (ast: Omit<TokenizerResult<AnyAst>, `result`>) => ast.source.slice(ast.pos, ast.pos + ast.length),
  noop: <T extends AnyAst | AnyAst[]>(o: T) => o,
};

export const briefInfo = ({ pos, length }: TokenizerResult<unknown>) => ({ pos, length });

export const fullSpan =
  <T extends Dictionary>(fn: (data: string) => T) =>
  (ast: unknown, info: TokenizerResult<unknown>) =>
    ({
      ...fn($u.nodeText(info)),
      ...briefInfo(info),
    }) as const;

export const rawSpan =
  <T extends Dictionary>(fn: (data: string) => T) =>
  (ast: unknown, info: TokenizerResult<unknown>) =>
    fn($u.nodeText(info));

export type InferTokenizer<T> = T extends Tokenizer<infer U> ? U : never;
