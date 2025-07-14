import { ExMap } from '../collections/ex-map';
import { checked, isROArray } from '../core/checks';
import { once } from '../core/once';
import { notNull } from '../utils/flow-utils';
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
// export class OperandsTreeBuilder<Token extends Dictionary> {
//   constructor(
//     /**
//      * Known operators definition. `symbol` used for matching. Some operators can't have symbol (e.g. call
//      * or braces-access). User can use `uid` for tagging and searching purposes, including searching
//      * non-symbolic operators to return them from getNonSymbolicOp.
//      */
//     readonly definitions: readonly OperatorDef[],
//     /**
//      * function to choose an operator for handling two consecutive operands without any operator between them.
//      * E.g. `a()`, `a[]`, `[]{}`, `a b` are all examples of such cases.
//      */
//     readonly getNonSymbolicOp: (left: Operand<Token>, node: Token) => OperatorDef
//   ) {}
//
//   readonly operands: Operand<Token>[] = [];
//   readonly operators: ParsedOp<Token>[] = [];
//
//   private wasOperator = true;
//
//   @once
//   get bySymbolByArgsByLtr() {
//     return ExMap.groupedBy(
//       this.definitions.filter((s): s is Omit<typeof s, `symbol`> & { symbol: string } => !!s.symbol),
//       o => o.symbol
//     ).mapEntries(v =>
//       ExMap.groupedBy(v, o => o.args).mapEntries(v =>
//         checked(
//           ExMap.mappedBy(v, v => v.ltr),
//           r => r.size === v.length,
//           () => {
//             console.log(v);
//             return `asedfsdfsdfsd`;
//           }
//         )
//       )
//     );
//   }
//
//   private buildOperation() {
//     const o = notNull(this.operators.pop(), `programming error`);
//     const ops = Array.from({ length: o.def.args }, () => notNull(this.operands.pop(), `programming error`));
//     o.def.ltr !== false && ops.reverse();
//     this.operands.push({ operator: o, operands: ops });
//   }
//
//   private onOperation(node: Token | undefined, def: OperatorDef) {
//     const { operators } = this;
//     if (!operators.length || def.priority < operators[operators.length - 1].def.priority) {
//       operators.push({ def, node });
//     } else {
//       this.buildOperation();
//       this.onOperation(node, def);
//     }
//     this.wasOperator = true;
//   }
//
//   private check(warn: string) {
//     if (this.finishCalled) {
//       console.warn(warn);
//       return false;
//     }
//     return true;
//   }
//
//   onOperator(node: Token, op: string) {
//     if (!this.check(`onOperand() called after onFinish(); ignoring...`)) {
//       return;
//     }
//
//     const args = this.wasOperator ? 1 : 2;
//     const def = notNull(
//       this.bySymbolByArgsByLtr.get(op)?.get(args),
//       () => `operator for '${op}' with args count ${args}`
//     );
//
//     /// TODO how to know, is it ltr or rtl operator? compare priority to previous operator maybe?
//     if (def.size > 1) {
//       throw new Error(`multiple definitions for '${op}' with args count ${args}`);
//     }
//
//     const dd = def.values().next().value!;
//     this.onOperation(node, dd);
//   }
//
//   onOperand(node: Token) {
//     if (!this.check(`onOperand() called after onFinish(); ignoring...`)) {
//       return;
//     }
//
//     if ((this.operators.length || this.operands.length) && !this.wasOperator) {
//       /// TODO function call, invalid syntax, etc.
//
//       this.onOperation(undefined, this.getNonSymbolicOp(this.operands[this.operands.length - 1], node));
//       this.onOperand(node);
//
//       return;
//     }
//     this.operands.push(node);
//
//     this.wasOperator = false;
//   }
//
//   private finishCalled = false;
//
//   onFinish() {
//     if (!this.check(`double call onFinish not allowed`)) {
//       return;
//     }
//
//     while (this.operators.length) {
//       this.buildOperation();
//     }
//     this.finishCalled = true;
//   }
//
//   get result() {
//     if (!this.finishCalled) {
//       throw new Error(`you didn't call this.onFinish(), but you must`);
//     }
//     if (this.operands.length !== 1) {
//       throw new Error(`tyghvj`);
//     }
//     return this.operands[0];
//   }
// }

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

  // readonly operands: Operand<Token>[] = [];
  // readonly operators: ParsedOp<Token>[] = [];

  // private wasOperator = true;

  operands: Operand<Token>[] = [];
  operators: OperatorDef[] = [];
  private expectOperand = true; // true = до операнда (префикс), false = после (постфикс/бинарник)

  @once
  get bySymbolByArgsByLtr() {
    return ExMap.groupedBy(
      this.definitions.filter((s): s is Omit<typeof s, `symbol`> & { symbol: string } => !!s.symbol),
      o => o.symbol
    ).mapEntries(v =>
      ExMap.groupedBy(v, o => o.args).mapEntries(v =>
        checked(
          ExMap.mappedBy(v, v => v.ltr),
          r => r.size === v.length,
          () => {
            console.log(v);
            return `asedfsdfsdfsd`;
          }
        )
      )
    );
  }

  // private buildOperation() {
  //   const o = notNull(this.operators.pop(), `programming error`);
  //   const ops = Array.from({ length: o.def.args }, () => notNull(this.operands.pop(), `programming error`));
  //   o.def.ltr !== false && ops.reverse();
  //   this.operands.push({ operator: o, operands: ops });
  // }

  // private onOperation(node: Token | undefined, def: OperatorDef) {
  //   const { operators } = this;
  //   if (!operators.length || def.priority < operators[operators.length - 1].def.priority) {
  //     operators.push({ def, node });
  //   } else {
  //     this.buildOperation();
  //     this.onOperation(node, def);
  //   }
  //   this.wasOperator = true;
  // }

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

  onOperator(node: Token, symbol: string) {
    if (!this.check(`onOperand() called after onFinish(); ignoring...`)) {
      return;
    }

    const defs = this.definitions.filter(d => d.symbol === symbol);
    if (defs.length === 0) {
      throw new Error(`Unknown operator: ${symbol}`);
    }

    let candidates: OperatorDef[];
    if (this.expectOperand) {
      // Ждём операнд => префиксные унарники (args=1, RTL)
      candidates = defs.filter(d => d.args === 1 && !d.ltr);
    } else {
      // После операнда => постфиксные унарники (args=1, LTR) или бинарники (args=2)
      candidates = defs.filter(d => (d.args === 1 && d.ltr) || d.args === 2);
    }
    if (candidates.length === 0) {
      throw new Error(`No valid form for '${symbol}' in current context`);
    }

    candidates.sort((a, b) => b.priority - a.priority);
    const op = candidates[0];

    while (this.operators.length > 0) {
      const top = this.operators[this.operators.length - 1];
      const higher = top.priority > op.priority || (top.priority === op.priority && top.ltr && op.ltr);
      if (!higher) {
        break;
      }
      this.build(this.operators.pop()!);
    }

    if (op.args === 1 && op.ltr) {
      // постфикс
      const operand = notNull(this.operands.pop());
      const node = { operator: op, operands: [operand] };
      this.operands.push(node);
      this.expectOperand = false;
    } else {
      // префикс или бинарник
      this.operators.push(op);
      this.expectOperand = true;
    }
  }

  onOperand(node: Token) {
    if (!this.check(`onOperand() called after onFinish(); ignoring...`)) {
      return;
    }

    // if ((this.operators.length || this.operands.length) && !this.wasOperator) {
    //   /// TODO function call, invalid syntax, etc.
    //
    //   this.onOperation(undefined, this.getNonSymbolicOp(this.operands[this.operands.length - 1], node));
    //   this.onOperand(node);
    //
    //   return;
    // }
    // this.operands.push(node);
    //
    // this.wasOperator = false;

    if (!this.expectOperand) {
      // два операнда подряд — получаем определение оператора между ними
      const left = notNull(this.operands.pop());
      const opBetween = this.getNonSymbolicOp(left, node);
      if (opBetween.args !== 2) {
        throw new Error(`Operator between operands must be binary, got ${opBetween.symbol}`);
      }
      // Создаём объединённый узел
      const combined = { operator: opBetween, operands: [left, node] };
      this.operands.push(combined);
      // После объединения ожидаем снова оператор или следующий постфикс
      this.expectOperand = false;
      return;
    }

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
