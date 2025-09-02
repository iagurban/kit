import { ExMap } from '@gurban/kit/collections/ex-map';
import { checked } from '@gurban/kit/core/checks';
import { once } from '@gurban/kit/core/once';
import { notNull } from '@gurban/kit/utils/flow-utils';

import { Dictionary } from './tokenizer-def';

export type OperatorDef = {
  symbol?: string;
  args: number;
  priority: number;
  ltr?: boolean;
  description: string;
  uid?: string;
};

type ParsedOp<Ast extends Dictionary> = { def: OperatorDef; node?: Ast };

export type Expr<Ast extends Dictionary> = { operator: ParsedOp<Ast>; operands: Operand<Ast>[] };

export type Operand<Ast extends Dictionary> = Ast | Expr<Ast>;

export class ExprGenerator<Token extends Dictionary> {
  readonly operands: Operand<Token>[] = [];
  readonly operators: ParsedOp<Token>[] = [];

  private wasOperator = true;

  @once
  get bySymbolByArgs() {
    return ExMap.groupedBy(
      this.definitions.filter((s): s is Omit<typeof s, `symbol`> & { symbol: string } => !!s.symbol),
      o => o.symbol
    ).mapEntries(v =>
      checked(
        ExMap.mappedBy(v, o => o.args),
        r => r.size > 0,
        () => `asedfsdfsdfsd`
      )
    );
  }

  constructor(
    readonly definitions: readonly OperatorDef[],
    readonly getNonSymbolicOp: (left: Operand<Token>, node: Token) => OperatorDef
  ) {}

  private buildOperation() {
    const o = notNull(this.operators.pop(), `programming error`);
    const ops = Array.from({ length: o.def.args }, () => notNull(this.operands.pop(), `programming error`));
    o.def.ltr !== false && ops.reverse();
    this.operands.push({ operator: o, operands: ops });
  }

  private onOperation(node: Token | undefined, def: OperatorDef) {
    const { operators } = this;
    if (!operators.length || def.priority < operators[operators.length - 1].def.priority) {
      operators.push({ def, node });
    } else {
      this.buildOperation();
      this.onOperation(node, def);
    }
    this.wasOperator = true;
  }

  private check(warn: string) {
    if (this.finishCalled) {
      console.warn(warn);
      return false;
    }
    return true;
  }

  onOperator(node: Token, op: string) {
    if (!this.check(`onOperand() called after onFinish(); ignoring...`)) {
      return;
    }

    const args = this.wasOperator ? 1 : 2;
    const def = notNull(
      this.bySymbolByArgs.get(op)?.get(args),
      () => `operator for '${op}' with args count ${args}`
    );
    this.onOperation(node, def);
  }

  onOperand(node: Token) {
    if (!this.check(`onOperand() called after onFinish(); ignoring...`)) {
      return;
    }

    if ((this.operators.length || this.operands.length) && !this.wasOperator) {
      /// TODO function call, invalid syntax, etc.

      this.onOperation(undefined, this.getNonSymbolicOp(this.operands[this.operands.length - 1], node));
      this.onOperand(node);

      return;
    }
    this.operands.push(node);

    this.wasOperator = false;
  }

  private finishCalled = false;

  onFinish() {
    if (!this.check(`double call onFinish not allowed`)) {
      return;
    }

    while (this.operators.length) {
      this.buildOperation();
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
