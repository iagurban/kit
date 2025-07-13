import { isDefined } from '../core/checks';
import { reversed } from '../utils/iterable-utils';
import { Nullish } from '../utils/types';
import {
  AstToken,
  Condition,
  definePinqLisplLang,
  defineTsLikeLang,
  ExprAst,
  Op,
  printExpr,
  resolveTypesBase,
  TypeHint,
  VarAst,
} from './ast-parser';
import { $t } from './define';
import { Expr, isExprOperand, Operand } from './operands-tree-builder';
import { AnyAst } from './tokenizer-def';

describe('parser', () => {
  test('first', () => {
    // testParse('123  456', $t.seq(NumberScalar, WSs, NumberScalar));

    const unpad = (s: string) =>
      s
        .split(`\n`)
        .map(s => s.trim())
        .join(`\n`);

    const { expression } = defineTsLikeLang();
    // console.log(printExpr(testParse(`(0+1,2+3,4+5,6+7)`, Expression).result));
    expect(
      unpad(
        printExpr(
          $t.run(`(a, b, c, d) => 0, 2, (1 +2, 2+ 3), e(1) ,123.2+ (a + 2, 4, 3-2)*456`, expression).result
        )
      )
    ).toBe(
      unpad(`(do
      (=>
        0
        (do a b c d)
      )
      2
      (do
        (+ 1 2)
        (+ 2 3)
      )
      (#call
        e
        1
      )
      (+
        123.2
        (* (do (+ a 2) 4 (- 3 2)) 456)
      )
    )`)
    );
    // console.log(printExpr(testParse(`1 ?? 456`, Expression).result));
  });

  test('types comb', () => {
    const resolveTypes = (ops: TypeHint<string>) => resolveTypesBase(v => v, ops);

    const prettyConditions = <V extends string>(ops: Condition<V>[][]) =>
      [...ops]
        .sort((a, b) => a[0]?.value.localeCompare(b[0]?.value))
        .map(
          op =>
            `(${[...op]
              .sort((a, b) => a.value.localeCompare(b.value))
              .map(op => `${op.not ? '!' : ''}${op.value}`)
              .join(' & ')})`
        )
        .join(' | ');

    expect(
      prettyConditions(
        resolveTypes({
          op: `or`,
          operands: [{ value: `t1` }, { value: `t2` }],
        })
      )
    ).toBe(`(t1) | (t2)`);

    expect(
      prettyConditions(
        resolveTypes({
          op: `and`,
          operands: [
            {
              op: `or`,
              operands: [
                {
                  op: `and`,
                  operands: [
                    {
                      op: `or`,
                      operands: [{ value: `t1` }, { value: `t1` }],
                    },
                  ],
                },
              ],
            },
          ],
        })
      )
    ).toBe(`(t1)`);

    expect(
      prettyConditions(
        resolveTypes({
          op: `and`,
          operands: [{ value: `t1` }, { value: `t2` }],
        })
      )
    ).toBe(`(t1 & t2)`);

    expect(
      prettyConditions(
        resolveTypes({
          op: `and`,
          operands: [
            { value: `t1` },
            {
              op: `or`,
              operands: [{ value: `t2` }, { value: `t3` }],
            },
          ],
        })
      )
    ).toBe(`(t1 & t2) | (t1 & t3)`);

    expect(
      prettyConditions(
        resolveTypes({
          op: `and`,
          operands: [
            {
              op: `or`,
              operands: [{ value: `t1` }, { value: `t2` }],
            },
            {
              op: `or`,
              operands: [{ value: `t3` }, { value: `t4` }],
            },
          ],
        })
      )
    ).toBe(`(t1 & t3) | (t2 & t3) | (t1 & t4) | (t2 & t4)`);

    expect(
      prettyConditions(
        resolveTypes({
          op: `or`,
          operands: [
            {
              op: `and`,
              operands: [{ value: `t1` }, { value: `t2` }],
            },
            {
              op: `and`,
              operands: [{ value: `t3` }, { value: `t4` }],
            },
          ],
        })
      )
    ).toBe(`(t1 & t2) | (t3 & t4)`);

    expect(
      prettyConditions(
        resolveTypes({
          op: `and`,
          operands: [
            {
              op: `not`,
              operand: {
                op: `not`,
                operand: {
                  op: `not`,
                  operand: {
                    op: `not`,
                    operand: { value: `t1` },
                  },
                },
              },
            },
            {
              op: `or`,
              operands: [{ value: `t3` }, { value: `t4` }],
            },
          ],
        })
      )
    ).toBe(`(!t1 & t3) | (!t1 & t4)`);
  });

  test('hjli', () => {
    // testParse('123  456', $t.seq(NumberScalar, WSs, NumberScalar));

    const { impExpression } = defineTsLikeLang();
    // console.log(printExpr(testParse(`(0+1,2+3,4+5,6+7)`, Expression).result));
    console.log(
      printExpr(
        $t.run(
          `a(), a[1234]; a[1234 - 2], a[1234 + 1]; 1+ a[((1234 + 1), (4 / 4))], (1 + a)[123, 2]`,
          impExpression
        ).result
      )
    );
    // console.log(printExpr(testParse(`1 ?? 456`, Expression).result));
  });

  test('pinql', () => {
    const { expression } = definePinqLisplLang();

    // const p = testParse(
    //   `#schema = Task && (priority >= 'high') && (
    //            (users[n] = currentUser() && users[n].isResponsible)
    //         || (users[c].isResponsible && users[c]{ deleted && someth })
    //         || !users[q].isResponsible
    //       )`,
    //   Expression
    // ).result;
    //
    // console.log(printExpr(p, 4));

    const compileAst = (e: ExprAst) => {
      type Ctx = { hints: Record<string, TypeHint<string>> | null };

      const binOp = <T>(
        op: `and` | `or`,
        guardsByVariable: (Record<string, TypeHint<T> | Nullish> | Nullish)[]
      ): Record<string, TypeHint<T>> | null => {
        const keys = new Set(guardsByVariable.filter(isDefined).flatMap(hash => Object.keys(hash)));
        return Object.fromEntries(
          [...keys]
            .map(key => {
              const operands: TypeHint<T>[] = [];
              for (const rec of reversed(guardsByVariable.filter(isDefined))) {
                const op = rec[key];
                if (op) {
                  operands.push(op);
                }
              }

              return operands.length === 0
                ? null
                : [
                    key,

                    operands.length === 1
                      ? operands[0]
                      : ({
                          op,
                          operands,
                        } as const),
                  ];
            })
            .filter(isDefined)
        );
      };

      const and = <T>(
        guardsByVariable: (Record<string, TypeHint<T> | Nullish> | Nullish)[]
      ): Record<string, TypeHint<T>> | null => binOp(`and`, guardsByVariable);

      const or = <T>(
        guardsByVariable: (Record<string, TypeHint<T> | Nullish> | Nullish)[]
      ): Record<string, TypeHint<T>> | null => binOp(`or`, guardsByVariable);

      const not = <T>(
        guardsByVariable: Record<string, TypeHint<T> | Nullish> | Nullish
      ): Record<string, TypeHint<T>> | null => {
        return guardsByVariable
          ? Object.fromEntries(
              Object.entries(guardsByVariable)
                .map(([key, value]) => {
                  return value == null
                    ? null
                    : [
                        key,
                        {
                          op: `not`,
                          operand: value,
                        } as const,
                      ];
                })
                .filter(isDefined)
            )
          : null;
      };

      const compileOperand = <Ast extends AstToken>(
        e: Operand<Ast>,
        ctx: Ctx
      ): {
        expr: Expr<Ast> | AnyAst;
        type: Op<string> | string;
        hints: Record<string, TypeHint<string>> | null;
      } => {
        if (!isExprOperand(e)) {
          console.log(e);

          switch (e.kind) {
            case `number`: {
              return {
                expr: e,
                type: `#number`,
                hints: null,
              };
            }
            case `boolean`: {
              return {
                expr: e,
                type: `#boolean`,
                hints: null,
              };
            }
            case `var`: {
              return {
                expr: e,
                type: `#symbol`,
                hints: null,
              };
            }
            default: {
              throw new Error(`dflghjdjkfgl`);
            }
          }
        }

        switch (e.operator.def.symbol) {
          case `=`: {
            if (e.operands.length !== 2) {
              throw new Error(`asledfgnsljkdfg`);
            }
            console.log(e.operands[0], e.operands[1]);

            const l = compileOperand(e.operands[0], ctx);
            const r = compileOperand(e.operands[1], ctx);

            console.log(l, r);

            let hints: Record<string, TypeHint<string>> | null = null;

            const addHint = (varOp: VarAst, hint: TypeHint<string>) => {
              // if left or absRight is variable ->  create hint
              const q = and([
                ctx.hints?.[varOp.name] ? { [varOp.name]: ctx.hints[varOp.name] } : null,
                hints ? { [varOp.name]: hints[varOp.name] } : null,
                { [varOp.name]: hint },
              ])?.[varOp.name];
              if (q) {
                if (!hints) {
                  hints = {};
                }
                hints[varOp.name] = q;
              }
            };

            if (!isExprOperand(e.operands[0]) && e.operands[0].kind === `var`) {
              /* TODO !!! commented beacuse of build problens */
              // addHint(e.operands[0], { value: r.type });
            }

            // return expression with hint if it exists
            return { expr: e, type: `#boolean`, hints: and([l.hints, r.hints, hints]) };
          }
          case `&&`: {
            if (e.operands.length !== 2) {
              throw new Error(`asledfgnsljkdfg`);
            }
            const l = compileOperand(e.operands[0], ctx);
            const r = compileOperand(e.operands[1], { ...ctx, hints: and([ctx.hints, l.hints]) });
            return { expr: e, type: `#boolean`, hints: and([ctx.hints, l.hints, r.hints]) };
          }
          case `||`: {
            if (e.operands.length !== 2) {
              throw new Error(`asledfgnsljkdfg`);
            }
            const l = compileOperand(e.operands[0], ctx);
            const r = compileOperand(e.operands[1], { ...ctx, hints: and([ctx.hints, not(l.hints)]) });
            return { expr: e, type: `#boolean`, hints: and([ctx.hints, or([l.hints, r.hints])]) };
          }
          default: {
            throw new Error(`unhandled operator: ${e.operator.def.symbol}`);
          }
        }
      };

      return e.data.map(e => compileOperand(e, { hints: null }));
    };

    const resolveTypes = (ops: TypeHint<string>) => resolveTypesBase(v => v, ops);

    if (false) {
      const r = $t.run(`1 || 456`, expression);

      const cc = compileAst(r.result);

      console.log(printExpr(r.result));
      console.dir(cc, { depth: 10 });
      console.dir(
        cc.map(
          cc =>
            cc.hints && Object.fromEntries(Object.entries(cc.hints).map(([key, g]) => [key, resolveTypes(g)]))
        ),
        { depth: 10 }
      );
    }

    {
      const r = $t.run(`a = 456`, expression);

      const cc = compileAst(r.result);

      console.log(printExpr(r.result));
      console.dir(cc, { depth: 10 });
      console.dir(
        cc.map(
          cc =>
            cc.hints && Object.fromEntries(Object.entries(cc.hints).map(([key, g]) => [key, resolveTypes(g)]))
        ),
        { depth: 10 }
      );
    }
  });
});

export {};
