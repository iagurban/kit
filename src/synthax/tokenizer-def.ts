export type Dictionary<Value = unknown> = Record<string, Value>;

type Primitive = string | bigint | number | boolean | null | undefined | symbol;

export type AnyAst = readonly unknown[] | Primitive | Record<string, unknown>;

export type Tokenizer<Ast extends AnyAst> = {
  <OutAst extends AnyAst>(ast: PipeFn<Ast, OutAst>): Tokenizer<OutAst>;
  pipe<OutAst extends AnyAst>(ast: PipeFn<Ast, OutAst>): Tokenizer<OutAst>;
  mute(): Tokenizer<null>;
  readonly tokenize: (ctx: ProcessorCtx) => TokenizerResult<Ast>;
};

export type ValueOrGetter<T extends Dictionary | readonly unknown[] | Tokenizer<AnyAst>> = T | (() => T);

export type ProcessorCtx = Readonly<{
  input: string;
  pos: number;
}>;

export type TokenizerResult<OutAst> = {
  result: OutAst;
  source: string;
  pos: number;
  length: number;
};

export type PipeFn<InAst extends AnyAst, OutAst extends AnyAst> = (
  ast: InAst,
  info: TokenizerResult<unknown>
) => OutAst;
