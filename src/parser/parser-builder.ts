import { ExMap } from '@gurban/kit/collections/ex-map';
import { ExSet } from '@gurban/kit/collections/ex-set';
import { isDefined, isROArray, isTruthy } from '@gurban/kit/core/checks';
import { aggregation } from '@gurban/kit/numbers/aggregation';
import { samplesBy } from '@gurban/kit/utils/array-utils';
import { notNull } from '@gurban/kit/utils/flow-utils';
import { allCodePoints, makeMatchingTree } from '@gurban/kit/utils/string-util';
import { thru } from 'lodash';

import { Expr, ExprGenerator, Operand, OperatorDef } from './expr-generator';
import {
  AnyAst,
  AstFromTokenizer,
  AstGenerator,
  Dictionary,
  ITokenizer,
  MapTokensInputArrayToAst,
  ProcessorCtx,
  TokenizerDef,
  TokenizerResult,
  ValueOrGetter,
} from './tokenizer-def';

// recursive JSON-like object

const noop = <T extends AnyAst | AnyAst[]>(o: T) => o;

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

// type TokenizeFn<OutAst extends AnyAst> = (ctx: ProcessorCtx) => TokenizerResult<OutAst>;

const defineTokenizer = <InAst extends AnyAst, OutAst extends AnyAst>(
  tokenize: (ctx: ProcessorCtx) => Pick<TokenizerResult<InAst>, `length` | `result`>,
  ast: AstGenerator<InAst, OutAst>
): ITokenizer<OutAst> => {
  const ttt = (ctx: ProcessorCtx): TokenizerResult<OutAst> => {
    const data = tokenize(ctx);
    const ret = { ...data, pos: ctx.pos, source: ctx.input };
    return { ...ret, result: ast(data.result, ret) };
  };

  const pipe = <OutAst2 extends AnyAst>(newAst: AstGenerator<OutAst, OutAst2>): ITokenizer<OutAst2> =>
    defineTokenizer(tokenize, (data, info) => newAst(ast(data, info), info));

  return Object.assign(pipe, {
    pipe,
    mute: () => defineTokenizer(tokenize, () => null),
    tokenize: ttt,
  } as const);
};

// const ccccp1t = defineTokenizer(
//   ctx => {
//     const cp = ctx.input.codePointAt(ctx.pos);
//     if (cp === 123) {
//       return {
//         length: 1,
//         result: { cp },
//       };
//     }
//     throw new UnmatchedError(ctx);
//   },
//   i => null
// );

const singleCodePointTokenize = (
  check: (cp: number | undefined) => cp is number
): ITokenizer<{ cp: number }> => {
  return defineTokenizer(
    ctx => {
      const cp = ctx.input.codePointAt(ctx.pos);
      if (check(cp)) {
        return {
          length: 1,
          result: cp,
        };
      }
      throw new UnmatchedError(ctx);
    },
    cp => ({ cp })
  );
};

const scpt1 = (codePoint: number): ITokenizer<{ cp: number }> =>
  singleCodePointTokenize((cp): cp is number => codePoint === cp);

const scpt2 = (codePoints: ReadonlySet<number>): ITokenizer<{ cp: number }> =>
  singleCodePointTokenize((cp): cp is number => cp !== undefined && codePoints.has(cp));

const makeCps = (cps: readonly number[] | ReadonlySet<number>): ITokenizer<{ cp: number }> =>
  isROArray(cps)
    ? cps.length === 1
      ? scpt1(cps[0])
      : thru(new Set(cps), cps => scpt2(cps))
    : cps.size === 1
      ? scpt1([...cps][0])
      : scpt2(cps);

const parseCodePointsRange = (pair: string) => {
  if (pair.length !== 2) {
    throw new Error(`shklndfgj`);
  }
  const cp1 = pair.codePointAt(0);
  const cp2 = pair.codePointAt(1);
  if (cp1 === undefined || cp2 === undefined) {
    throw new Error(`fsdfjklghdjklfg`);
  }
  if (cp1 >= cp2) {
    throw new Error(`odfghjrjtj`);
  }
  return [cp1, cp2] as const;
};

class CodePointsBuilder {
  readonly cps = new ExSet<number>();

  range(pair: string) {
    const [start, end] = parseCodePointsRange(pair);
    this.cps.join(Array.from({ length: end - start + 1 }, (_, i) => start + i));
    return this;
  }

  any(chars: string) {
    this.cps.join(allCodePoints(chars));
    return this;
  }
}

const unwrap = <T extends AnyAst | AnyAst[]>(
  t: ValueOrGetter<ITokenizer<T> | TokenizerFabric<T, T>>
): Pick<ITokenizer<T>, `tokenize`> => {
  if (`tokenize` in t) {
    return t;
  }
  const r = typeof t === `function` ? t() : t;
  return `tokenize` in r ? r : r.create(o => o);
};
//
// type MapAstsToDefs<Asts extends readonly unknown[]> = Asts extends [infer F, ...infer R]
//   ? readonly [
//       F extends AnyAst ? ValueOrGetter<TokenizerDef<F>> : never,
//       ...(Asts extends { length: 0 } ? [] : MapAstsToDefs<R>),
//     ]
//   : never;

type ExtractNotArray<T> = Exclude<T, Extract<T, readonly unknown[]>>;

type TokenizerFabric<InTokens extends AnyAst, OutAst extends AnyAst> = {
  create: (ast: AstGenerator<InTokens, OutAst>) => ITokenizer<OutAst>;
};

const $t = {
  cp(apply: (b: CodePointsBuilder) => unknown) {
    const b = new CodePointsBuilder();
    apply(b);
    return makeCps([...b.cps]);
  },
  cps(cps: string) {
    return makeCps(Array.from(cps, s => s.codePointAt(0)!));
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

  not(cps: string) {
    const set = new Set(Array.from(cps, a => a.codePointAt(0)!));

    return singleCodePointTokenize((cp): cp is number => cp !== undefined && !set.has(cp));
  },

  seq<
    InTokens extends readonly ValueOrGetter<
      ITokenizer<AnyAst | AnyAst[]> | TokenizerFabric<AnyAst, AnyAst>
    >[],
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
  or<InTokens extends ValueOrGetter<ITokenizer<AnyAst>>>(tokens: readonly InTokens[]) {
    return defineTokenizer(
      ctx => {
        for (const t of tokens) {
          try {
            return unwrap(t).tokenize(ctx) as /* TODO */ TokenizerResult<AstFromTokenizer<InTokens>>;
          } catch {
            // console.log(`tokenize failed`, error);
            // ignore
          }
        }
        throw new UnmatchedError(ctx);
      },
      forward => forward
    );
  },
  repeat<InAst extends ExtractNotArray<AnyAst>>(
    token: ValueOrGetter<ITokenizer<InAst>>,
    min: number | undefined,
    max?: number
  ) {
    if (min === undefined && max === undefined) {
      throw new Error(`dfgkbndj`);
    }

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
              if ((min != null && matches.length < min) || (max != null && matches.length > max)) {
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
  maybe<InAst extends AnyAst>(token: ValueOrGetter<ITokenizer<InAst>>) {
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

// const makeResult = <InAst extends AnyAst, OutAst extends AnyAst>(
//   data: Omit<TokenizerResult<InAst>, `pos` | `source`>,
//   gen: AstGenerator<InAst, OutAst>,
//   ctx: ProcessorCtx
// ): TokenizerResult<OutAst> => {
//   const ast = { ...data, pos: ctx.pos, source: ctx.input };
//   return { ...ast, result: gen(ast.result, ast) };
// };

export const testParse = <Ast extends AnyAst>(input: string, tokenizer: TokenizerDef<Ast>) => {
  const ctx: ProcessorCtx = { input, pos: 0 };
  const r = tokenizer.tokenize(ctx);
  if (r.length !== input.length) {
    throw new Error(`partially matched, rest: ${input.slice(r.length, r.length + 30)}...`);
  }
  return r;
};

const [exclMarkCp, lessMarkCp] = Array.from(`!<`, s => s.codePointAt(0)!);

export const isExprOperand = <Ast extends Dictionary>(o: Operand<Ast>): o is Expr<Ast> =>
  `operator` in o &&
  o.operator != null &&
  typeof o.operator === `object` &&
  `operands` in o &&
  isROArray(o.operands);

type AstBase<T> = { pos: number; length: number } & T;

export type VarAst = AstBase<{ kind: `var`; name: string }>;
export type OpAst = AstBase<{ kind: `op`; data: string }>;
export type NumberAst = AstBase<{ kind: `number`; data: string }>;
export type BooleanAst = AstBase<{ kind: `boolean`; data: string }>;
export type StringAst = AstBase<{ kind: `string`; data: string }>;
export type ExprAst = AstBase<{ kind: `expression`; data: Operand<AstToken>[] }>;
export type ParenAst = AstBase<{
  kind: `paren`;
  open: `{` | `(` | `[`;
  close: `}` | `)` | `]`;
  data: Operand<AstToken>[] | null;
}>;

export type AstToken = VarAst | OpAst | NumberAst | BooleanAst | StringAst | ExprAst | ParenAst;

const ops = <O extends Dictionary, Q extends readonly { symbol?: string; description: string }[]>(
  options: O,
  ...defs: Q
): (O & Q[number])[] => defs.map(d => ({ ...options, ...d }) as const);

const ltr = <A extends number>(a: A) => ({ args: a }) as const;
const rtl = <A extends number>(a: A) => ({ args: a, ltr: false }) as const;

const op = <S extends string, Q extends string | undefined, Uid extends string | undefined>(
  description: S,
  symbol: Q,
  uid?: Uid
) => ({ symbol, description, uid }) as const;
const u = <S extends string | undefined>(s: S) => ({ description: `${s}a`, symbol: s }) as const;
const b = <S extends string | undefined>(s: S) => ({ description: `a ${s} b`, symbol: s }) as const;

const tsLanguage = {
  accessOrCallOps: () =>
    [
      [
        ...ops(
          ltr(1),
          // call, access, etc.
          op('import(x)', `import`)
        ),
        ...ops(
          ltr(2),
          // call, access, etc.
          op('#call a(...b)', undefined, `#call`),
          op('#access a[...b]', undefined, `#get`),
          // member access
          op(`a.b`, '.'),
          op(`a?.b`, '?.'),
          // new with args
          op(`new x(y)`, `new`)
        ),
      ],
      ops(
        ltr(1),
        // new without args
        op(`new x`, `new`)
      ),
    ] as const,

  unaryPostfixOps: () =>
    [
      ops(
        ltr(1),
        // postfix operators
        op(`x++`, `++`),
        op(`x--`, `--`)
      ),
    ] as const,

  unaryOps: () =>
    [
      ops(
        rtl(1),
        // prefix operators
        u(`++`),
        u(`--`),
        // unary
        u(`+`),
        u(`-`),
        u(`~`),
        u(`!`),
        op(`typeof x`, 'typeof'),
        op(`void x`, 'void'),
        op(`delete x`, 'delete'),
        op(`await x`, 'await')
      ),
    ] as const,

  binaryOps: () =>
    [
      ops(
        rtl(2),
        // highest-priority binary
        b('**')
      ),
      ops(
        ltr(2),
        // high-priority binary
        b('*'),
        b('/'),
        b('%')
      ),
      ops(
        ltr(2),
        // middle-priority binary
        b('+'),
        b('-')
      ),
    ] as const,

  bitShiftOps: () =>
    [
      ops(
        ltr(2),
        // bitwise shift/c++ pipe
        b('<<'),
        b('>>'),
        b('>>>')
      ),
    ] as const,

  comparisonOps: () =>
    [
      ops(
        ltr(2),
        // relative comparison
        b('<'),
        b('<='),
        b('>'),
        b('>='),
        b('in'),
        b('instanceof')
      ),
      ops(
        ltr(2),
        // equality comparison
        b('=='),
        b('==='),
        b('!='),
        b('!==')
      ),
    ] as const,

  bitwiseOps: () =>
    [
      // bitwise operations
      ops(ltr(2), b('&')),
      ops(ltr(2), b('^')),
      ops(ltr(2), b('|')),
    ] as const,

  logicOps: () =>
    [
      // logic
      ops(ltr(2), b('&&')),
      ops(ltr(2), b('||'), b('??')),
    ] as const,

  assignmentOps: () =>
    [
      [
        ...ops(
          rtl(2),
          b('='),
          b('+='),
          b('-='),
          b('**='),
          b('*='),
          b('/='),
          b('%='),
          b('<<='),
          b('>>='),
          b('>>>='),
          b('&='),
          b('^='),
          b('|='),
          b('&&='),
          b('||='),
          b('??='),
          op('x ? y : z', '?'),
          op('x ? y : z', ':'),
          b('=>')
        ),
        ...ops(rtl(1), u('...'), op(`yield x`, 'yield'), op(`yield* x`, 'yield*')),
      ],
    ] as const,

  separatorOps: () =>
    [
      // statements separator
      ops(ltr(2), op(`a, b`, ',')),
      // ops(ltr(2), op(`a; b`, ';')),
    ] as const,
} as const;

const tsOpDefs = () => {
  return (
    [
      ...tsLanguage.accessOrCallOps(),
      ...tsLanguage.unaryPostfixOps(),
      ...tsLanguage.unaryOps(),
      ...tsLanguage.binaryOps(),
      ...tsLanguage.bitShiftOps(),
      ...tsLanguage.comparisonOps(),
      ...tsLanguage.bitwiseOps(),
      ...tsLanguage.logicOps(),
      ...tsLanguage.assignmentOps(),
      ...tsLanguage.separatorOps(),
    ] as const
  ).flatMap((s, i) => s.map(s => ({ ...s, priority: i }) as const)) satisfies OperatorDef[];
};

const createExprGen = (definitions23235: OperatorDef[]) => {
  const fnOp = notNull(definitions23235.find(d => d.description.startsWith(`#call`)));
  const accOp = notNull(definitions23235.find(d => d.description.startsWith(`#access`)));

  return () =>
    new ExprGenerator<AstToken>(definitions23235, (_left, right) => {
      if (right.kind !== `paren`) {
        throw new Error(`invalid syntax: sequential operands are not function call or bracket-access`);
      }
      return right.open === `(` ? fnOp : accOp;
    });
};

const buildExpressionTree = (
  createExprGen: () => ExprGenerator<AstToken>,
  tokens: readonly AstToken[]
): Operand<AstToken> => {
  const g = createExprGen();
  for (const n of tokens) {
    if (n.kind === 'op') {
      g.onOperator(n, n.data);
    } else {
      g.onOperand(n);
    }
  }
  g.onFinish();
  return g.result;
};

const flattenCommas = (data: Operand<AstToken>, candidates: readonly string[]) => {
  const recur = (data: Operand<AstToken>): Operand<AstToken>[] => {
    if (isExprOperand(data)) {
      for (const [i, candidate] of candidates.entries()) {
        if (data.operator.def.symbol === candidate && data.operator.def.args === 2) {
          const cc = candidates.slice(i);
          return cc.length ? data.operands.flatMap(t => flattenCommas(t, cc)) : data.operands;
        }
      }
      return [data];
    }

    return [data];
  };

  return recur(data);
};

export const printExpr = (t: ExprAst, wrapDepth: number = 2) => {
  const s = (n: number) => samplesBy(n, () => '  ').join('');

  const printRaw = (first: string, rest: (ident: boolean) => string[], depth: number, ident: boolean) => {
    const sd = s(depth);

    return depth < wrapDepth
      ? `${sd}(${first}\n${rest(true)
          .map(s => `${s}\n`)
          .join('')}${sd})`
      : `${ident ? sd : ''}(${first} ${rest(false).join(' ')})`;
  };

  const printOperands = (ops: Operand<AstToken>[], depth: number, ident: boolean) => {
    const p = (i: Operand<AstToken>, depth: number, ident: boolean) => printSomething(i, depth, ident);

    return ops.length < 2
      ? ops[0]
        ? `${p(ops[0], depth, ident)}`
        : ''
      : printRaw(`do`, ident => ops.map(item => p(item, depth + 1, ident)), depth, ident);
  };

  const printAst = <Ast extends AstToken>(o: Ast, depth: number, ident: boolean): string => {
    switch (o.kind) {
      case 'paren': {
        return printOperands(o.data || [], depth, ident);
      }
      case 'expression': {
        return printOperands(o.data, depth, ident);
      }
      case 'number': {
        return `${ident ? s(depth) : ''}${o.data}`;
      }
      case 'var': {
        return `${ident ? s(depth) : ''}${o.name}`;
      }
      case 'string': {
        return `${ident ? s(depth) : ''}"${o.data}"`;
      }
      default: {
        throw new Error(`dxfklnhj ${o.kind}`);
      }
    }
  };

  const printExpr = <Ast extends AstToken>(o: Expr<Ast>, depth: number, ident: boolean) => {
    // console.dir(o.operator, { depth: null });
    return printRaw(
      o.operator.def.symbol ?? o.operator.def.uid ?? `UNKNOWN[${o.operator.def.description}]`,
      ident => o.operands.map(o => printSomething(o, depth + 1, ident)).filter(isTruthy),
      depth,
      ident
    );
  };

  const printSomething = <Ast extends AstToken>(o: Operand<Ast>, depth: number, ident: boolean): string => {
    return isExprOperand(o) ? printExpr(o, depth, ident) : printAst(o, depth, ident);
  };

  return printSomething(t, 0, false);
};

const mute = (): null => null;

const nodeText = (ast: Omit<TokenizerResult<AnyAst>, `result`>) =>
  ast.source.slice(ast.pos, ast.pos + ast.length);

export const defineTestLang = () => {
  const opDefs = tsOpDefs();
  const eg = createExprGen(opDefs);

  const bet = (tokens: readonly AstToken[]) => buildExpressionTree(eg, tokens);

  const briefInfo = ({ pos, length }: TokenizerResult<unknown>) => ({ pos, length });

  const lettersRangeB = (b: CodePointsBuilder) => b.range(`az`).range(`AZ`);
  const digitsRangeB = (b: CodePointsBuilder) => b.range(`09`);
  const specCharsB = (b: CodePointsBuilder) => b.any(`_$`);

  const whitespaceMatcher = $t.cps(` \t\n`)(mute);
  const maybeWsMatcher = $t.repeat(whitespaceMatcher, 0)(mute);
  const whitespacesMatcher = $t.repeat(whitespaceMatcher, 1)(mute);

  // const EqSign = $t.cps(`=`)(mute);
  //
  // const EqOp = $t.seq(
  //   $t.cps(`=!`)(ast => ast.cp === exclMarkCp),
  //   $t.repeat(EqSign, 0, 2)(ast => ast.items.length)
  // )(
  //   ({ sequence: [isExc, restLength] }, info): OpAst => ({
  //     kind: `op`,
  //     data: nodeText(info), // eqKind(isExc, restLength),
  //     ...briefInfo(info),
  //   })
  // );

  const raw =
    <T extends Dictionary>(fn: (data: string) => T) =>
    (ast: unknown, info: TokenizerResult<unknown>) =>
      ({
        ...fn(nodeText(info)),
        ...briefInfo(info),
      }) as const;

  const opAst = raw(data => ({ kind: `op`, data }) as const);

  // const CmpOp = $t.seq(
  //   $t.cps(`<>`)(ast => ast.cp),
  //   $t.repeat(EqSign, 0, 1)(a => a.items.length < 1)
  // )(
  //   ({ sequence: [first, strict] }, info): OpAst => ({
  //     kind: `op`,
  //     data: nodeText(info), // String.fromCodePoint(first) + (strict ? '' : '='),
  //     // strict,
  //     ...briefInfo(info),
  //   })
  // );

  const numOp = $t.seq($t.cps(`+-*/%`)(mute), $t.maybe($t.cps(`=`)(mute))(mute))(opAst);

  // const SimpleOp = $t.cps(`,.`)(opAst);

  const fixedOp = $t.keywords(new Set(opDefs.map(o => o.symbol).filter(isTruthy)))(
    ({ match }, info): OpAst => ({
      kind: `op`,
      data: match,
      ...briefInfo(info),
    })
  );

  const operator = $t.or([
    // EqOp,
    // CmpOp,
    // SimpleOp,
    fixedOp,
    numOp,
  ])(noop);

  const digit = $t.cp(b => digitsRangeB(b))(mute);
  const tailVarLetter = $t.cp(b => specCharsB(digitsRangeB(lettersRangeB(b))))(mute);
  const firstVarLetter = $t.cp(b => specCharsB(lettersRangeB(b)))(mute);

  const numberScalar = $t.seq(
    // don't check for minus, it will be unary or binary operator
    // $t.maybe($t.cps(`-`)(mute))(mute),

    $t.repeat(digit, 1)(mute),
    $t.maybe($t.seq($t.cps(`.`)(mute), $t.repeat(digit, 1)(mute))(mute))(mute)
  )(raw(data => ({ kind: `number`, data }) as const));

  const scalar = $t.or([numberScalar])(noop);

  const varName = $t.seq(
    firstVarLetter,
    $t.repeat(tailVarLetter, 0)(mute)
  )(raw(name => ({ kind: `var`, name }) as const));

  const operand = $t.or([scalar, varName, () => parenExpr, () => bracedExpr])(noop);

  const expression = $t.repeat(
    $t.or([whitespacesMatcher, operator, operand])(noop),
    1
  )(
    (items, info): ExprAst => ({
      kind: `expression`,
      data: flattenCommas(bet(items.filter(isDefined)), [`;`, `,`]),
      ...briefInfo(info),
    })
  );

  const impExpression = $t.repeat(
    $t.or([expression, $t.cps(`;`)(mute)])(noop),
    1
  )(
    (items, info): ExprAst => ({
      kind: `expression`,
      data: items.flatMap(f => (f ? f.data : [])),
      ...briefInfo(info),
    })
  );

  const parenExpr: ITokenizer<ParenAst> = $t.or(
    (
      [
        [`(`, `)`],
        [`[`, `]`],
      ] as const
    ).map(([open, close]) =>
      $t.seq(
        $t.cps(open).pipe(mute),
        $t.maybe(expression).pipe(noop),
        $t.cps(close).pipe(mute)
      )(
        ([, result], info): ParenAst =>
          ({
            kind: `paren`,
            open,
            close,
            data: result.item?.data || null,
            ...briefInfo(info),
          }) as const
      )
    )
  )(noop);

  const bracedExpr: ITokenizer<ParenAst> = $t.seq(
    $t.cps(`{`)(mute),
    $t.maybe(impExpression)(noop),
    $t.cps(`}`)(mute)
  )(
    ([, result], info): ParenAst =>
      ({
        kind: `paren`,
        open: `{`,
        close: `}`,
        data: result.item?.data.filter(isDefined) || null,
        ...briefInfo(info),
      }) as const
  );

  return {
    expression,
    parenExpr,
    operand,
    impExpression,
  } as const;
};

export const definePinqlLang = () => {
  const opDefs = (
    [
      ops(
        ltr(2),
        // call, access, etc.
        op('#call a(...b)', undefined, `#call`),
        op('#access a[...b]', undefined, `#get`),
        op('#sub a{...b}', undefined, `#sub`),
        // member access
        op(`a.b`, '.')
      ),
      // ...tsLanguage.unaryPostfixOps(),
      ops(
        rtl(1),
        // unary
        u(`+`),
        u(`-`),
        u(`~`),
        u(`!`),
        op(`typeof x`, 'typeof')
      ),
      ...tsLanguage.binaryOps(),
      ...tsLanguage.bitShiftOps(),
      ops(
        ltr(2),
        // relative comparison
        b('<'),
        b('<='),
        b('>'),
        b('>='),
        b('in'),
        b('instanceof')
      ),
      ops(
        ltr(2),
        // equality comparison
        b('='),
        b('!=')
      ),
      ...tsLanguage.bitwiseOps(),
      ...tsLanguage.logicOps(),
      ops(
        rtl(2),
        op('x ? y : z', '?'),
        op('x ? y : z', ':')
        // b('=>')
      ),
      ...tsLanguage.separatorOps(),
    ] as const
  ).flatMap((s, i) => s.map(s => ({ ...s, priority: i }) as const satisfies OperatorDef));

  const createExprGen = (definitions: OperatorDef[]) => {
    const fnOp = notNull(definitions.find(d => d.description.startsWith(`#call`)));
    const accOp = notNull(definitions.find(d => d.description.startsWith(`#access`)));
    const lamOp = notNull(definitions.find(d => d.description.startsWith(`#sub`)));

    return () =>
      new ExprGenerator<AstToken>(definitions, (_left, right) => {
        if (right.kind !== `paren`) {
          throw new Error(`invalid syntax: sequential operands are not function call or bracket-access`);
        }
        return right.open === `(` ? fnOp : right.open === `{` ? lamOp : accOp;
      });
  };

  const eg = createExprGen(opDefs);

  const bet = (tokens: readonly AstToken[]) => buildExpressionTree(eg, tokens);

  const briefInfo = ({ pos, length }: TokenizerResult<unknown>) => ({ pos, length });

  const hexLettersRangeB = (b: CodePointsBuilder) => b.range(`af`).range(`AF`);
  const lettersRangeB = (b: CodePointsBuilder) => b.range(`az`).range(`AZ`);
  const digitsRangeB = (b: CodePointsBuilder) => b.range(`09`);
  const specCharsB = (b: CodePointsBuilder) => b.any(`_$`);

  const WS = $t.cps(` \t\n`).mute();
  const WSs = $t.repeat(WS, 1).mute();

  const raw =
    <T extends Dictionary>(fn: (data: string) => T) =>
    (ast: unknown, info: TokenizerResult<unknown>) =>
      ({
        ...fn(nodeText(info)),
        ...briefInfo(info),
      }) as const;

  const Operator = $t.keywords(new Set(opDefs.map(o => o.symbol).filter(isTruthy)))(
    ({ match }, info): OpAst => ({
      kind: `op`,
      data: match,
      ...briefInfo(info),
    })
  );

  const Digit = $t.cp(b => digitsRangeB(b)).mute();
  const TailVarLetter = $t.cp(b => specCharsB(digitsRangeB(lettersRangeB(b)))).mute();
  const FirstVarLetter = $t.cp(b => specCharsB(lettersRangeB(b))).mute();

  const NumberScalar = $t.seq(
    $t.repeat(Digit, 1).mute(),
    $t.maybe($t.seq($t.cps(`.`).mute(), $t.repeat(Digit, 1).mute()).mute()).mute()
  )(raw(data => ({ kind: `number`, data }) as const));

  const Scalar = $t.or([NumberScalar]);

  const FixedEscapesEnd = $t.or([
    ...(
      [
        [`n`, `\n`],
        [`t`, `\t`],
        [`r`, `\r`],
        [`\\`, `\\`],
      ] as const
    ).map(([a, b]) => $t.cps(a)(() => b)),
    $t.repeat(
      $t.cp(b => hexLettersRangeB(digitsRangeB(b))).mute(),
      1
    )((ast, info) => String.fromCodePoint(+nodeText(info))),
    $t.failure(`unknown escape sequence`),
  ]);

  const Backslash = $t.cps(`\\`);

  const EscapeSeq = (q: string) =>
    $t.seq(Backslash, $t.or([$t.cps(q).mute(), FixedEscapesEnd]))(([, value]) => value);

  const StringScalar = $t.or(
    ([[`'`], [`"`], ['`']] as const).map(([q]) =>
      $t.seq(
        $t.cps(q).mute(),
        $t.repeat($t.or([EscapeSeq(q), $t.not(q)((ast, info) => nodeText(info))]), 0),
        $t.cps(q).mute()
      )
    )
  )(
    ([, items], info): StringAst => ({
      kind: `string`,
      data: items.join(''),
      ...briefInfo(info),
    })
  );

  const VarName = $t.seq(
    $t.or([FirstVarLetter, $t.cps(`#`).mute()]),
    $t.repeat(TailVarLetter, 0).mute()
  )(raw(name => ({ kind: `var`, name }) as const));

  const Operand = $t.or([StringScalar, () => ParenExpr, Scalar, VarName]);

  const Expression = $t.repeat(
    $t.or([WSs, Operator, Operand]),
    1
  )(
    (items, info): ExprAst => ({
      kind: `expression`,
      data: flattenCommas(bet(items.filter(isDefined)), [`,`]),
      ...briefInfo(info),
    })
  );

  const ParenExpr: ITokenizer<ParenAst> = $t.or(
    (
      [
        [`(`, `)`],
        [`[`, `]`],
        [`{`, `}`],
      ] as const
    ).map(([open, close]) =>
      $t.seq(
        $t.cps(open).mute(),
        $t.maybe(Expression),
        $t.cps(close).mute()
      )(
        ([, result], info): ParenAst =>
          ({
            kind: `paren`,
            open,
            close,
            data: result.item?.data || null,
            ...briefInfo(info),
          }) as const
      )
    )
  );

  return { Expression, ParenExpr, Operand } as const;
};

export type Condition<V> = { value: V; not?: boolean };

export type Op<V> =
  | { op: `and` | `or`; operands: readonly TypeHint<V>[] }
  | { op: `not`; operand: TypeHint<V> };

const conditionsToOperands = <V>(ops: Condition<V>[][][]): Op<V>[] =>
  ops.map(o => ({ op: `or`, operands: o.map(o => ({ op: `and`, operands: o })) }));

const resolveTypesImpl = <V>(op: TypeHint<V>, add: (c: Condition<V>[]) => void): void => {
  if (`value` in op) {
    return add([op]);
  }

  if (`operands` in op) {
    if (op.operands.length === 0) {
      return; // [];
    }
    if (op.operands.length === 1) {
      return resolveTypesImpl(op.operands[0], add);
    }
  }

  switch (op.op) {
    case `or`: {
      for (const o of op.operands) {
        resolveTypesImpl(o, add);
      }
      return;
    }
    case `and`: {
      const ops = op.operands.map(o => {
        const ops: Condition<V>[][] = [];
        resolveTypesImpl(o, o => ops.push(o));
        return ops;
      });

      for (const [i, op] of ops.entries()) {
        for (const op2 of ops.slice(i + 1)) {
          for (const o1 of op) {
            for (const o2 of op2) {
              add([...o2, ...o1]);
            }
          }
        }
      }
      return;
    }
    case `not`: {
      if (typeof op.operand === `string`) {
        return add([{ value: op.operand, not: true }]);
      }

      if (`value` in op.operand) {
        return add([{ ...op.operand, not: !op.operand }]);
      }

      switch (op.operand.op) {
        case `or`: {
          // !(a | b) = !a & !b
          return resolveTypesImpl(
            {
              op: `and`,
              operands: conditionsToOperands(
                op.operand.operands.map(o => {
                  const cc: Condition<V>[][] = [];
                  resolveTypesImpl({ op: `not`, operand: o }, c => cc.push(c));
                  return cc;
                })
              ),
            },
            add
          );
        }
        case `and`: {
          // !(a & b) = a | b
          return resolveTypesImpl(
            {
              op: `or`,
              operands: conditionsToOperands(
                op.operand.operands.map(o => {
                  const cc: Condition<V>[][] = [];
                  resolveTypesImpl(o, c => cc.push(c));
                  return cc;
                })
              ),
            },
            add
          );
        }
        case `not`: {
          const o: Condition<V>[][] = [];
          resolveTypesImpl(op.operand, c => o.push(c));
          o.forEach(o => o.forEach(o => add([{ ...o, not: !o.not }])));

          return;
        }
        default: {
          throw new Error(`dfghjkl`);
        }
      }
    }
    default: {
      throw new Error(`fsdflngk`);
    }
  }
};

type ResultTreeValue = { exists?: boolean; next: ResultTree };
type ResultTree = ExMap<string, ResultTreeValue>;

class TypesUniquer<V> {
  constructor(readonly getID: (o: V) => string) {}

  readonly map: ResultTree = new ExMap();
  readonly result: Condition<V>[][] = [];

  add(cc: Condition<V>[]) {
    let current: ResultTreeValue = { next: this.map };
    for (const c of [...cc].sort((a, b) => this.getID(a.value).localeCompare(this.getID(b.value)))) {
      const id = this.getID(c.value);
      const o = current.next.get(id);
      if (o) {
        current = o;
      } else {
        const next: ResultTreeValue = { next: new ExMap() };
        current.next.set(id, next);
        current = next;
      }
    }
    if (!current.exists) {
      current.exists = true;
      this.result.push(cc);
    }
  }
}

export const resolveTypesBase = <V>(getID: (o: V) => string, op: TypeHint<V>): Condition<V>[][] => {
  const cc = new TypesUniquer<V>(getID);
  resolveTypesImpl(op, c => cc.add(c));
  // console.log(`r`, cc.result);
  return cc.result;
};

export type TypeHint<T> = Op<T> | Condition<T>;
