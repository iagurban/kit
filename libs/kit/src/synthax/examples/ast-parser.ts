import { ExMap } from '../../collections/ex-map';
import { isDefined, isTruthy } from '../../core/checks';
import { samplesBy } from '../../utils/array-utils';
import { notNull } from '../../utils/flow/flow-utils';
import { $o, $t, $u, locationInfo } from '../define';
import { Expr, isExprOperand, Operand, OperandsTreeBuilder, OperatorDef } from '../operands-tree-builder';
import { Dictionary, Tokenizer, TokenizerResult } from '../tokenizer-def';
import { CodePointsBuilder } from '../util/code-points-builder';
import { jsonPresets } from './json-parser';
import { tsLanguageOperators } from './ts-ast-parser';

// const [exclMarkCp, lessMarkCp] = Array.from(`!<`, s => s.codePointAt(0)!);

type AstBase<T> = {
  /* pos: number; length: number */
} & T;

export type VarAst = AstBase<{ kind: `identifier`; name: string }>;
export type OpAst = AstBase<{ kind: `op`; symbol: string }>;
export type NumberAst = AstBase<{ kind: `number`; raw: string }>;
export type BooleanAst = AstBase<{ kind: `boolean`; value: boolean }>;
export type StringAst = AstBase<{ kind: `string`; value: string }>;
export type ExprAst = AstBase<{ kind: `expression`; data: Operand<AstToken> }>;
export type ParenAst = AstBase<{
  kind: `paren`;
  open: `{` | `(` | `[`;
  close: `}` | `)` | `]`;
  data: readonly Operand<AstToken>[] | null;
}>;

export type FnDeclAst = AstBase<{
  kind: 'functionDecl';
  identifier: VarAst;
  args: ParenAst;
  body: ParenAst;
}>;

export type AstToken =
  | { kind: `null` | `undefined` }
  | VarAst
  | OpAst
  | NumberAst
  | BooleanAst
  | StringAst
  | ExprAst
  | ParenAst
  | FnDeclAst;

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

  const printOperands = (ops: readonly Operand<AstToken>[], depth: number, ident: boolean) => {
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
        return printOperands([o.data], depth, ident);
      }
      case 'number': {
        return `${ident ? s(depth) : ''}${o.raw}`;
      }
      case 'identifier': {
        return `${ident ? s(depth) : ''}${o.name}`;
      }
      case 'string': {
        return `${ident ? s(depth) : ''}"${o.value}"`;
      }
      default: {
        throw new Error(`dxfklnhj ${o.kind}`);
      }
    }
  };

  const printExpr = <Ast extends AstToken>(o: Expr<Ast>, depth: number, ident: boolean) => {
    // console.dir(o.operator, { depth: null });
    return printRaw(
      o.operator.symbol ?? o.operator.uid ?? `UNKNOWN[${o.operator.description}]`,
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

/**
 * Builds a tree of expressions from array of operands and operators according to operators' priority, direction, etc.
 */
export const buildExpressionTree = (
  createExprGen: () => OperandsTreeBuilder<AstToken>,
  tokens: readonly AstToken[]
): Operand<AstToken> => {
  const g = createExprGen();
  for (const n of tokens) {
    if (n.kind === 'op') {
      g.onOperator(n.symbol);
    } else {
      g.onOperand(n);
    }
  }
  g.onFinish();
  return g.result;
};

export const flattenCommas = (data: Operand<AstToken>, candidates: readonly string[]) => {
  const recur = (data: Operand<AstToken>): Operand<AstToken>[] => {
    if (isExprOperand(data)) {
      for (const [i, candidate] of candidates.entries()) {
        if (data.operator.symbol === candidate && data.operator.args === 2) {
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

// export const defineTsLikeLang = () => {
//   const createExprGen = (definitions23235: OperatorDef[]) => {
//     const fnOp = notNull(definitions23235.find(d => d.description.startsWith(`#call`)));
//     const accOp = notNull(definitions23235.find(d => d.description.startsWith(`#access`)));
//
//     return () =>
//       new OperandsTreeBuilder<AstToken>(definitions23235, (_left, right) => {
//         if (right.kind !== `paren`) {
//           throw new Error(`invalid syntax: sequential operands are not function call or bracket-access`);
//         }
//         return right.open === `(` ? fnOp : accOp;
//       });
//   };
//
//   const opDefs = tsOperators();
//   const eg = createExprGen(opDefs);
//
//   const { mute, nodeText } = $u;
//
//   const bet = (tokens: readonly AstToken[]) => buildExpressionTree(eg, tokens);
//
//   const briefInfo = ({ pos, length }: TokenizerResult<unknown>) => ({ pos, length });
//
//   const lettersRangeB = (b: CodePointsBuilder) => b.range(`az`).range(`AZ`);
//   const digitsRangeB = (b: CodePointsBuilder) => b.range(`09`);
//   const specCharsB = (b: CodePointsBuilder) => b.any(`_$`);
//
//   const whitespaceMatcher = $t.cps(` \t\n`)(mute);
//   const maybeWsMatcher = $t.repeat(whitespaceMatcher, 0)(mute);
//   const whitespacesMatcher = $t.repeat(whitespaceMatcher, 1)(mute);
//
//   // const EqSign = $t.cps(`=`)(mute);
//   //
//   // const EqOp = $t.seq(
//   //   $t.cps(`=!`)(ast => ast.cp === exclMarkCp),
//   //   $t.repeat(EqSign, 0, 2)(ast => ast.items.length)
//   // )(
//   //   ({ sequence: [isExc, restLength] }, info): OpAst => ({
//   //     kind: `op`,
//   //     data: nodeText(info), // eqKind(isExc, restLength),
//   //     ...briefInfo(info),
//   //   })
//   // );
//
//   const raw =
//     <T extends Dictionary>(fn: (data: string) => T) =>
//     (ast: unknown, info: TokenizerResult<unknown>) =>
//       ({
//         ...fn(nodeText(info)),
//         ...briefInfo(info),
//       }) as const;
//
//   const opAst = raw(data => ({ kind: `op`, symbol: data }) as const);
//
//   // const CmpOp = $t.seq(
//   //   $t.cps(`<>`)(ast => ast.cp),
//   //   $t.repeat(EqSign, 0, 1)(a => a.items.length < 1)
//   // )(
//   //   ({ sequence: [first, strict] }, info): OpAst => ({
//   //     kind: `op`,
//   //     data: nodeText(info), // String.fromCodePoint(first) + (strict ? '' : '='),
//   //     // strict,
//   //     ...briefInfo(info),
//   //   })
//   // );
//
//   const numOp = $t.seq($t.cps(`+-*/%`)(mute), $t.maybe($t.cps(`=`)(mute))(mute))(opAst);
//
//   // const SimpleOp = $t.cps(`,.`)(opAst);
//
//   const fixedOp = $t.keywords(new Set(opDefs.map(o => o.symbol).filter(isTruthy)))(
//     ({ match }, info): OpAst => ({
//       kind: `op`,
//       symbol: match,
//       ...briefInfo(info),
//     })
//   );
//
//   const operator = $t.or([
//     // EqOp,
//     // CmpOp,
//     // SimpleOp,
//     fixedOp,
//     numOp,
//   ]);
//
//   const digit = $t.cp(b => digitsRangeB(b))(mute);
//   const tailVarLetter = $t.cp(b => specCharsB(digitsRangeB(lettersRangeB(b))))(mute);
//   const firstVarLetter = $t.cp(b => specCharsB(lettersRangeB(b)))(mute);
//
//   const numberScalar = $t.seq(
//     // don't check for minus, it will be a unary or binary operator
//     // $t.maybe($t.cps(`-`)(mute))(mute),
//
//     $t.repeat(digit, 1)(mute),
//     $t.maybe($t.seq($t.cps(`.`)(mute), $t.repeat(digit, 1)(mute))(mute))(mute)
//   )(raw(data => ({ kind: `number`, raw: data }) as const));
//
//   const scalar = $t.or([numberScalar]);
//
//   const varName = $t.seq(
//     firstVarLetter,
//     $t.repeat(tailVarLetter, 0)(mute)
//   )(raw(name => ({ kind: `identifier`, name }) as const));
//
//   const operand = $t.or([scalar, varName, () => parenExpr, () => bracedExpr]);
//
//   const expression = $t.repeat(
//     $t.or([whitespacesMatcher, operator, operand]),
//     1
//   )(
//     (items, info): ExprAst => ({
//       kind: `expression`,
//       data: bet(items.filter(isDefined)),
//       ...briefInfo(info),
//     })
//   );
//
//   const impExpression = $t.repeat(
//     $t.or([expression, $t.cps(`;`)(mute)]),
//     1
//   )(
//     (items, info): ExprAst => ({
//       kind: `expression`,
//       data: items.map(f => f?.data),
//       ...briefInfo(info),
//     })
//   );
//
//   const parenExpr: Tokenizer<ParenAst> = $t.or(
//     (
//       [
//         [`(`, `)`],
//         [`[`, `]`],
//       ] as const
//     ).map(([open, close]) =>
//       $t.seq(
//         $t.cps(open).pipe(mute),
//         $t.maybe(expression),
//         $t.cps(close).pipe(mute)
//       )(
//         ([, result], info): ParenAst =>
//           ({
//             kind: `paren`,
//             open,
//             close,
//             data: result.item?.data || null,
//             ...briefInfo(info),
//           }) as const
//       )
//     )
//   );
//
//   const bracedExpr: Tokenizer<ParenAst> = $t.seq(
//     $t.cps(`{`)(mute),
//     $t.maybe(impExpression),
//     $t.cps(`}`)(mute)
//   )(
//     ([, result], info): ParenAst =>
//       ({
//         kind: `paren`,
//         open: `{`,
//         close: `}`,
//         data: result.item?.data.filter(isDefined) || null,
//         ...briefInfo(info),
//       }) as const
//   );
//
//   return {
//     expression,
//     parenExpr,
//     operand,
//     impExpression,
//   } as const;
// };

export const definePinqLisplLang = () => {
  const { ops, op, ltr, binary, unary, rtl } = $o;
  const { nodeText } = $u;

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
        unary(`+`),
        unary(`-`),
        unary(`~`),
        unary(`!`),
        op(`typeof x`, 'typeof')
      ),
      ...tsLanguageOperators.binaryOps(),
      ...tsLanguageOperators.bitShiftOps(),
      ops(
        ltr(2),
        // relative comparison
        binary('<'),
        binary('<='),
        binary('>'),
        binary('>='),
        binary('in'),
        binary('instanceof')
      ),
      ops(
        ltr(2),
        // equality comparison
        binary('='),
        binary('!=')
      ),
      ...tsLanguageOperators.bitwiseOps(),
      ...tsLanguageOperators.logicOps(),
      ops(
        rtl(2),
        op('x ? y : z', '?'),
        op('x ? y : z', ':')
        // b('=>')
      ),
      ...tsLanguageOperators.separatorOps(),
    ] as const
  ).flatMap((s, i) => s.map(s => ({ ...s, priority: i }) as const satisfies OperatorDef));

  const createExprGen = (definitions: OperatorDef[]) => {
    const fnOp = notNull(definitions.find(d => d.description.startsWith(`#call`)));
    const accOp = notNull(definitions.find(d => d.description.startsWith(`#access`)));
    const lamOp = notNull(definitions.find(d => d.description.startsWith(`#sub`)));

    return () =>
      new OperandsTreeBuilder<AstToken>(definitions, (_left, right) => {
        if (right.kind !== `paren`) {
          throw new Error(`invalid syntax: sequential operands are not function call or bracket-access`);
        }
        return right.open === `(` ? fnOp : right.open === `{` ? lamOp : accOp;
      });
  };

  const eg = createExprGen(opDefs);

  const bet = (tokens: readonly AstToken[]) => buildExpressionTree(eg, tokens);

  const hexLettersRangeB = (b: CodePointsBuilder) => b.range(`af`).range(`AF`);
  const lettersRangeB = (b: CodePointsBuilder) => b.range(`az`).range(`AZ`);
  const digitsRangeB = (b: CodePointsBuilder) => b.range(`09`);
  const specCharsB = (b: CodePointsBuilder) => b.any(`_$`);

  const ws = $t.cps(` \t\n`).mute();
  const wss = $t.repeat(ws, 1).mute();

  const raw =
    <T extends Dictionary>(fn: (data: string) => T) =>
    (ast: unknown, info: TokenizerResult<unknown>) =>
      ({
        ...fn(nodeText(info)),
        ...locationInfo(info),
      }) as const;

  const operator = $t.keywords(new Set(opDefs.map(o => o.symbol).filter(isTruthy)))(
    ({ match }, info): OpAst => ({
      kind: `op`,
      symbol: match,
      ...locationInfo(info),
    })
  );

  const tailVarLetter = $t.cp(b => specCharsB(digitsRangeB(lettersRangeB(b)))).mute();
  const firstVarLetter = $t.cp(b => specCharsB(lettersRangeB(b))).mute();

  const numberScalar = jsonPresets.positiveNumberMatcher(
    (none, info) => ({ kind: `number`, raw: $u.nodeText(info), ...locationInfo(info) }) as const
  );

  const scalar = $t.or([numberScalar]);

  const stringScalar = $t.or(([[`'`], [`"`], ['`']] as const).map(([q]) => jsonPresets.stringLiteral(q)))(
    (item, info): StringAst => ({
      kind: `string`,
      value: item.join(``),
      ...locationInfo(info),
    })
  );

  const varName = $t.seq(
    $t.or([firstVarLetter, $t.cps(`#`).mute()]),
    $t.repeat(tailVarLetter, 0).mute()
  )(raw(name => ({ kind: `identifier`, name }) as const));

  const operand = $t.or([stringScalar, () => parenExpr, scalar, varName]);

  const expression = $t.repeat(
    $t.or([wss, operator, operand]),
    1
  )(
    (items, info): ExprAst => ({
      kind: `expression`,
      data: bet(items.filter(isDefined)),
      ...locationInfo(info),
    })
  );

  const parenExpr: Tokenizer<ParenAst> = $t.or(
    (
      [
        [`(`, `)`],
        [`[`, `]`],
        [`{`, `}`],
      ] as const
    ).map(([open, close]) =>
      $t.seq(
        $t.cps(open).mute(),
        $t.maybe(expression),
        $t.cps(close).mute()
      )(
        ([, result], info): ParenAst =>
          ({
            kind: `paren`,
            open,
            close,
            data: result.item ? [result.item.data] : null,
            ...locationInfo(info),
          }) as const
      )
    )
  );

  return { expression, parenExpr, operand } as const;
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
