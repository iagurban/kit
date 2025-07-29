import { $o } from '../define';
import { OperatorDef } from '../operands-tree-builder';

export const tsLanguageOperators = {
  unaryPostfixOps: () =>
    [
      $o.ops(
        $o.ltr(1),
        // postfix operators
        $o.op(`x++`, `++`),
        $o.op(`x--`, `--`)
      ),
    ] as const,

  unaryOps: () =>
    [
      $o.ops(
        $o.rtl(1),
        // prefix operators
        $o.unary(`++`),
        $o.unary(`--`),
        // unary
        $o.unary(`+`),
        $o.unary(`-`),
        $o.unary(`~`),
        $o.unary(`!`),
        $o.op(`typeof x`, 'typeof', undefined, true),
        $o.op(`void x`, 'void', undefined, true),
        $o.op(`delete x`, 'delete', undefined, true),
        $o.op(`await x`, 'await', undefined, true)
      ),
    ] as const,

  binaryOps: () =>
    [
      $o.ops(
        $o.ltr(2),
        // middle-priority binary
        $o.binary('+'),
        $o.binary('-')
      ),
      $o.ops(
        $o.ltr(2),
        // high-priority binary
        $o.binary('*'),
        $o.binary('/'),
        $o.binary('%')
      ),
      $o.ops(
        $o.rtl(2),
        // highest-priority binary
        $o.binary('**')
      ),
    ] as const,

  bitShiftOps: () =>
    [
      $o.ops(
        $o.ltr(2),
        // bitwise shift/c++ pipe
        $o.binary('<<'),
        $o.binary('>>'),
        $o.binary('>>>')
      ),
    ] as const,

  comparisonOps: () =>
    [
      $o.ops(
        $o.ltr(2),
        // equality comparison
        $o.binary('=='),
        $o.binary('==='),
        $o.binary('!='),
        $o.binary('!==')
      ),
      $o.ops(
        $o.ltr(2),
        // relative comparison
        $o.binary('<'),
        $o.binary('<='),
        $o.binary('>'),
        $o.binary('>='),
        $o.binary('in'),
        $o.binary('instanceof', true)
      ),
    ] as const,

  bitwiseOps: () =>
    [
      // bitwise operations
      $o.ops($o.ltr(2), $o.binary('|')),
      $o.ops($o.ltr(2), $o.binary('^')),
      $o.ops($o.ltr(2), $o.binary('&')),
    ] as const,

  logicOps: () =>
    [
      // logic
      $o.ops($o.ltr(2), $o.binary('||'), $o.binary('??')),
      $o.ops($o.ltr(2), $o.binary('&&')),
    ] as const,

  separatorOps: () =>
    [
      $o.ops($o.ltr(2), $o.op(`a; b`, ';')),
      // statements separator
      $o.ops($o.ltr(2), $o.op(`a, b`, ',')),
    ] as const,

  assignmentOps: () =>
    [
      [
        ...$o.ops(
          $o.rtl(2),
          $o.binary('='),
          $o.binary('+='),
          $o.binary('-='),
          $o.binary('**='),
          $o.binary('*='),
          $o.binary('/='),
          $o.binary('%='),
          $o.binary('<<='),
          $o.binary('>>='),
          $o.binary('>>>='),
          $o.binary('&='),
          $o.binary('^='),
          $o.binary('|='),
          $o.binary('&&='),
          $o.binary('||='),
          $o.binary('??='),
          $o.op('x ? y : z', '?'),
          $o.op('x ? y : z', ':'),
          $o.binary('=>')
        ),
        ...$o.ops(
          $o.rtl(1),
          $o.unary('...'),
          $o.op(`yield x`, 'yield', undefined, true),
          $o.op(`yield* x`, 'yield*', undefined, true)
        ),
      ],
    ] as const,

  accessOrCallOps: () =>
    [
      $o.ops(
        $o.rtl(1),
        // new without args
        $o.op(`new x`, `new`, undefined, true)
      ),
      [
        ...$o.ops(
          $o.ltr(1),
          // call, access, etc.
          $o.op('import(x)', `import`, undefined, true)
        ),
        ...$o.ops(
          $o.ltr(2),
          // call, access, etc.
          $o.op('#call a(...b)', undefined, `#call`),
          $o.op('#access a[...b]', undefined, `#get`),
          // member access
          $o.op(`a.b`, '.'),
          $o.op(`a?.b`, '?.')
        ),
        ...$o.ops(
          $o.rtl(2),
          // new with args
          $o.op(`new x(y)`, `new`, undefined, true)
        ),
      ],
    ] as const,
} as const;

export const tsOperators = () => {
  return (
    [
      ...tsLanguageOperators.separatorOps(),
      ...tsLanguageOperators.assignmentOps(),
      ...tsLanguageOperators.logicOps(),
      ...tsLanguageOperators.bitwiseOps(),
      ...tsLanguageOperators.comparisonOps(),
      ...tsLanguageOperators.bitShiftOps(),
      ...tsLanguageOperators.binaryOps(),
      ...tsLanguageOperators.unaryOps(),
      ...tsLanguageOperators.unaryPostfixOps(),
      ...tsLanguageOperators.accessOrCallOps(),
    ] as const
  ).flatMap((s, i) => s.map(s => ({ ...s, priority: i }) as const)) satisfies OperatorDef[];
};
