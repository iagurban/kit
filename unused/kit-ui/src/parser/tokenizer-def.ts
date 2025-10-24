import { AnyAnyFunction } from '@gurban/kit/utils/types.ts';

export type Dictionary<Value = unknown> = Record<string, Value>;

type Primitive = string | bigint | number | boolean | null | undefined | symbol;

export type AnyAst = readonly unknown[] | Primitive | Record<string, unknown>;

export type ITokenizer<Ast extends AnyAst> = {
  <OutAst extends AnyAst>(ast: AstGenerator<Ast, OutAst>): ITokenizer<OutAst>;
  pipe<OutAst extends AnyAst>(ast: AstGenerator<Ast, OutAst>): ITokenizer<OutAst>;
  mute(): ITokenizer<null>;
  readonly tokenize: (ctx: ProcessorCtx) => TokenizerResult<Ast>;
};

export type ValueOrGetter<T extends Dictionary | readonly unknown[] | ITokenizer<AnyAst>> = T | (() => T);

export type ProcessorCtx = Readonly<{
  input: string;
  pos: number;
}>;

export type AstFromTokenizer<T> = T extends { tokenize: AnyAnyFunction<{ result: infer R }> }
  ? R
  : T extends () => infer TT
    ? AstFromTokenizer<TT>
    : never;

export type TokenizerResult<OutAst> = {
  result: OutAst;
  source: string;
  pos: number;
  length: number;
};

export type TokenizerDef<Ast extends AnyAst> = {
  /** returns parsing result on success, or should throw if matching failed;
   *  doesn't change ctx
   *
   * @param {ProcessorCtx} ctx
   * @returns {TokenizerResult<Ast>}
   */

  tokenize(ctx: ProcessorCtx): TokenizerResult<Ast>;
};

export type AstGenerator<InAst extends AnyAst, OutAst extends AnyAst> = (
  ast: InAst,
  info: TokenizerResult<unknown>
) => OutAst;

export type MapAstsToTokensInputArray<Rest> = Rest extends readonly [infer E, ...infer R]
  ? readonly [
      E extends AnyAst ? ValueOrGetter<TokenizerDef<E>> : never,
      ...(R extends { length: 0 } ? [] : MapAstsToTokensInputArray<R>),
    ]
  : never;

export type MapTokensInputArrayToAst<Rest> = Rest extends readonly [infer E, ...infer R]
  ? readonly [AstFromTokenizer<E>, ...(R extends { length: 0 } ? [] : MapTokensInputArrayToAst<R>)]
  : never;
