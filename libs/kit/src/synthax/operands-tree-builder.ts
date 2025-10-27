import { maxBy, thru } from 'lodash';

import { ExMap } from '../collections/ex-map';
import { isROArray } from '../core/checks';
import { once } from '../core/once';
import { notNull } from '../utils/flow/flow-utils';
import { Dictionary } from './tokenizer-def';

export type OperatorDef = {
  symbol?: string;
  args: number;
  priority: number;
  ltr: boolean;
  description: string;
  uid?: string;
};

export type Expr<Ast extends Dictionary> = { operator: OperatorDef; operands: Operand<Ast>[] };

export type Operand<Ast extends Dictionary> = Ast | Expr<Ast>;

/**
 * Consumes operands and operators and creates a tree of them according to operators' priorities and
 * directions of defined operators in `definitions`.
 *
 * Initialization example:
 * ```typescript
 * const fnOp = notNull(definitions.find(d => d.uid === `#call`));
 * const accOp = notNull(definitions.find(d => d.uid === `#access`));
 *
 * return new OperandsTreeBuilder<AstToken>(definitions, (_left, right) => {
 *   if (right.kind !== `paren`) {
 *     throw new Error(`invalid syntax: sequential operands are not function call or bracket-access`);
 *   }
 *   return right.open === `(` ? fnOp : accOp;
 * });
 * ```
 */
export class OperandsTreeBuilder<Token extends Dictionary> {
  constructor(
    /**
     * Known operators definition. `symbol` used for matching. Some operators can't have symbol (e.g. call
     * or braces-access). User can use `uid` for tagging and searching purposes, including searching
     * non-symbolic operators to return them from getNonSymbolicOp.
     */
    readonly definitions: readonly OperatorDef[],
    /**
     * function to choose an operator for handling two consecutive operands without any operator between them.
     * E.g. `a()`, `a[]`, `[]{}`, `a b` are all examples of such cases.
     */
    readonly getNonSymbolicOp: (left: Operand<Token>, node: Token) => OperatorDef
  ) {}

  operands: Operand<Token>[] = [];
  operators: OperatorDef[] = [];
  private expectOperand = true; // true = до операнда (префикс), false = после (постфикс/бинарник)

  @once
  get bySymbol() {
    return ExMap.groupedBy(
      this.definitions.filter((s): s is Omit<typeof s, `symbol`> & { symbol: string } => !!s.symbol),
      o => o.symbol
    ).mapEntries(v =>
      thru(
        ExMap.groupedBy(v, o => o.args === 1 && !o.ltr),
        r => {
          for (const v of r.values()) {
            const mapping = ExMap.mappedBy(v, v => `${v.ltr}:${v.args}`);
            if (mapping.size !== v.length) {
              throw new Error(
                `duplicate operator definition: "${v[0].symbol}" (args: ${v[0].args}, ltr: ${v[0].ltr})`
              );
            }
          }
          return r;
        }
      )
    );
  }

  private check(warn: string) {
    if (this.finishCalled) {
      console.warn(warn);
      return false;
    }
    return true;
  }

  private build(op: OperatorDef): void {
    if (op.args === 1) {
      // префикс или постфикс
      const operand = notNull(this.operands.pop());
      const node = { operator: op, operands: [operand] };
      this.operands.push(node);
    } else {
      // бинарный
      const right = notNull(this.operands.pop());
      const left = notNull(this.operands.pop());
      this.operands.push({ operator: op, operands: [left, right] });
    }
  }

  protected pickOperator(symbol: string): OperatorDef {
    // Ждём операнд => префиксные унарники (args=1, RTL)
    // После операнда => постфиксные унарники (args=1, LTR) или бинарники (args=2)
    const candidates = this.bySymbol.get(symbol)?.get(this.expectOperand) || [];
    if (candidates.length === 0) {
      throw new Error(`No valid form for '${symbol}' in current context`);
    }
    return notNull(maxBy(candidates, o => o.priority));
  }

  protected buildAllStronger(op: OperatorDef) {
    while (this.operators.length > 0) {
      const top = this.operators[this.operators.length - 1];
      const higher = top.priority > op.priority || (top.priority === op.priority && top.ltr && op.ltr);
      if (!higher) {
        break;
      }
      this.build(this.operators.pop()!);
    }
  }

  onOperator(symbol: string) {
    if (!this.check(`onOperand() called after onFinish(); ignoring...`)) {
      return;
    }

    const operator = this.pickOperator(symbol);
    this.buildAllStronger(operator);

    if (operator.args === 1 && operator.ltr) {
      // постфикс
      this.operands.push({ operator: operator, operands: [notNull(this.operands.pop())] });
      this.expectOperand = false;
    } else {
      // префикс или бинарник
      this.operators.push(operator);
      this.expectOperand = true;
    }
  }

  onOperand(node: Token) {
    if (!this.check(`onOperand() called after onFinish(); ignoring...`)) {
      return;
    }

    if (!this.expectOperand) {
      const operator = this.getNonSymbolicOp(notNull(this.operands[this.operands.length - 1]), node);
      if (operator.args !== 2) {
        throw new Error(`Operator between operands must be binary, got ${operator.symbol}`);
      }

      this.buildAllStronger(operator);

      this.operands.push({ operator: operator, operands: [notNull(this.operands.pop()), node] });
      this.expectOperand = false;
      return;
    }

    // обычный случай — первый операнд в выражении
    this.operands.push(node);
    this.expectOperand = false;
  }

  private finishCalled = false;

  onFinish() {
    if (!this.check(`double call onFinish not allowed`)) {
      return;
    }

    while (this.operators.length > 0) {
      this.build(this.operators.pop()!);
    }

    this.finishCalled = true;
  }

  get result() {
    if (!this.finishCalled) {
      throw new Error(`you didn't call this.onFinish(), but you must`);
    }
    if (this.operands.length !== 1) {
      throw new Error(`tyghvj`);
    }

    return this.operands[0];
  }
}

export const isExprOperand = <Ast extends Dictionary>(o: Operand<Ast>): o is Expr<Ast> =>
  `operator` in o &&
  o.operator != null &&
  typeof o.operator === `object` &&
  `operands` in o &&
  isROArray(o.operands);
