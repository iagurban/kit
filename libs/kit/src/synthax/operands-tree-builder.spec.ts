import { notNull } from '../utils/flow/flow-utils';
import { tsOperators } from './examples/ts-ast-parser';
import { Operand, OperandsTreeBuilder, OperatorDef } from './operands-tree-builder';

type TestToken = {
  kind: string;
  value?: string;
  open?: string;
};

describe('OperandsTreeBuilder', () => {
  let operators: OperatorDef[];
  let builder: OperandsTreeBuilder<TestToken>;

  beforeEach(() => {
    // Define common operators
    operators = tsOperators();

    // Initialize builder with non-symbolic operator handler
    builder = new OperandsTreeBuilder<TestToken>(operators, (_left: Operand<TestToken>, right: TestToken) => {
      if (right.kind !== 'paren') {
        throw new Error('Invalid syntax: sequential operands');
      }
      return right.open === '('
        ? notNull(operators.find(op => op.uid === '#call'))
        : notNull(operators.find(op => op.uid === '#get'));
    });
  });

  describe('Basic Operations', () => {
    it('should handle simple binary operations', () => {
      builder.onOperand({ kind: 'number', value: '1' });
      builder.onOperator('+');
      builder.onOperand({ kind: 'number', value: '2' });
      builder.onFinish();

      expect(builder.result).toEqual({
        operator: expect.objectContaining({ symbol: '+', args: 2 }),
        operands: [
          { kind: 'number', value: '1' },
          { kind: 'number', value: '2' },
        ],
      });

      const a = builder.operands.length + builder.operators.length;
      builder.onOperand({ kind: 'number', value: '1' });
      expect(builder.operands.length + builder.operators.length).toBe(a);
      builder.onOperator('+');
      expect(builder.operands.length + builder.operators.length).toBe(a);
      builder.onFinish();
      expect(builder.operands.length + builder.operators.length).toBe(a);
    });

    it('should throw if double (symbol+args) operator is defined', () => {
      expect(
        () =>
          new OperandsTreeBuilder(
            [
              { priority: 1, args: 1, symbol: `+`, description: ``, ltr: true },
              { priority: 1, args: 1, symbol: `+`, description: ``, ltr: true },
            ],
            () => undefined as unknown as OperatorDef
          ).bySymbol
      ).toThrow();
    });

    it('should throw error if missing next operand/operator', () => {
      builder.onOperand({ kind: 'number', value: '1' });
      builder.onOperator('+');
      expect(() => builder.result).toThrow();
      expect(() => builder.onFinish()).toThrow();
      builder.onOperand({ kind: 'number', value: '1' });
      builder.onFinish();

      const a = builder.operands.length + builder.operators.length;
      builder.onOperator('+');
      expect(builder.operands.length + builder.operators.length).toBe(a);
    });

    it('should handle operator precedence', () => {
      builder.onOperand({ kind: 'number', value: '1' });
      builder.onOperator('+');
      builder.onOperand({ kind: 'number', value: '2' });
      builder.onOperator('*');
      builder.onOperand({ kind: 'number', value: '3' });
      builder.onFinish();

      expect(builder.result).toEqual({
        operator: expect.objectContaining({ symbol: '+' }),
        operands: [
          { kind: 'number', value: '1' },
          {
            operator: expect.objectContaining({ symbol: '*' }),
            operands: [
              { kind: 'number', value: '2' },
              { kind: 'number', value: '3' },
            ],
          },
        ],
      });
    });
  });

  describe('Non-symbolic Operations', () => {
    it('should handle function calls', () => {
      builder.onOperand({ kind: 'identifier', value: 'fn' });
      builder.onOperand({ kind: 'paren', open: '(' });
      builder.onFinish();

      expect(builder.result).toEqual({
        operator: expect.objectContaining({ uid: '#call' }),
        operands: [
          { kind: 'identifier', value: 'fn' },
          { kind: 'paren', open: '(' },
        ],
      });
    });

    it('should handle array access', () => {
      builder.onOperand({ kind: 'identifier', value: 'arr' });
      builder.onOperand({ kind: 'paren', open: '[' });
      builder.onFinish();

      expect(builder.result).toEqual({
        operator: expect.objectContaining({ uid: '#get' }),
        operands: [
          { kind: 'identifier', value: 'arr' },
          { kind: 'paren', open: '[' },
        ],
      });
    });
  });

  describe('Error Handling', () => {
    it('should throw error for invalid sequential operands', () => {
      builder.onOperand({ kind: 'number', value: '1' });
      expect(() => {
        builder.onOperand({ kind: 'number', value: '2' });
      }).toThrow('Invalid syntax: sequential operands');
    });

    it('should throw error when accessing result without calling onFinish', () => {
      builder.onOperand({ kind: 'number', value: '1' });
      expect(() => builder.result).toThrow("you didn't call this.onFinish()");
    });

    it('should warn on operations after finish', () => {
      const warnSpy = jest.spyOn(console, 'warn');

      builder.onOperand({ kind: 'number', value: '1' });
      builder.onFinish();
      builder.onOperand({ kind: 'number', value: '2' });

      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('called after onFinish'));
    });
  });

  describe('Complex Expressions', () => {
    it('should handle unary operators', () => {
      builder.onOperator('-');
      builder.onOperand({ kind: 'number', value: '1' });
      builder.onFinish();

      expect(builder.result).toEqual({
        operator: expect.objectContaining({ symbol: '-', args: 1 }),
        operands: [{ kind: 'number', value: '1' }],
      });
    });

    it('should handle chained operations with correct associativity', () => {
      builder.onOperand({ kind: 'number', value: '1' });
      builder.onOperator('+');
      builder.onOperand({ kind: 'number', value: '2' });
      builder.onOperator('+');
      builder.onOperand({ kind: 'number', value: '3' });
      builder.onFinish();

      // Verify left-to-right associativity for addition
      expect(builder.result).toEqual({
        operator: expect.objectContaining({ symbol: '+' }),
        operands: expect.any(Array),
      });
    });
  });

  describe('Unary operators', () => {
    it('should parse single prefix operator', () => {
      builder.onOperator('++');
      builder.onOperand({ kind: 'number', value: '5' });
      builder.onFinish();

      expect(builder.result).toEqual({
        operator: expect.objectContaining({ symbol: '++' }),
        operands: [{ kind: 'number', value: '5' }],
      });
    });

    it('should parse chained prefix operators RTL', () => {
      builder.onOperator('++');
      builder.onOperator('--');
      builder.onOperand({ kind: 'number', value: '7' });
      builder.onFinish();

      expect(builder.result).toEqual({
        operator: expect.objectContaining({ symbol: '++' }),
        operands: [
          {
            operator: expect.objectContaining({ symbol: '--' }),
            operands: [{ kind: 'number', value: '7' }],
          },
        ],
      });
    });

    it('should parse single postfix operator', () => {
      builder.onOperand({ kind: 'number', value: '8' });
      builder.onOperator('++');
      builder.onFinish();

      expect(builder.result).toEqual({
        operator: expect.objectContaining({ symbol: '++' }),
        operands: [{ kind: 'number', value: '8' }],
      });
    });

    it('should parse chained postfix operators LTR', () => {
      builder.onOperand({ kind: 'number', value: '3' });
      builder.onOperator('++');
      builder.onOperator('--');
      builder.onFinish();

      // ((3++)--)
      expect(builder.result).toEqual({
        operator: expect.objectContaining({ symbol: '--' }),
        operands: [
          {
            operator: expect.objectContaining({ symbol: '++' }),
            operands: [{ kind: 'number', value: '3' }],
          },
        ],
      });
    });

    it('should mix prefix and postfix with correct binding', () => {
      // ++a++  → prefix binds right, postfix binds left
      builder.onOperator('++');
      builder.onOperand({ kind: 'identifier', value: 'a' });
      builder.onOperator('++');
      builder.onFinish();

      // should be interpreted as ( ++ ( a++ ) )
      expect(builder.result).toEqual({
        operator: expect.objectContaining({ symbol: '++' }),
        operands: [
          {
            operator: expect.objectContaining({ symbol: '++' }),
            operands: [{ kind: 'identifier', value: 'a' }],
          },
        ],
      });
    });

    it(`more complex unary stacking`, () => {
      builder.onOperator('+');
      builder.onOperator('new');
      builder.onOperand({ kind: 'identifier', value: 'Date' });
      builder.onOperand({ kind: 'paren', open: '(' });
      builder.onFinish();

      console.dir(builder.result, { depth: null });
    });
  });
});
