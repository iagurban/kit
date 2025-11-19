import { isDefined, isTruthy, notNull, once } from '../../../core';
import { $t, $u, testParser } from '../define';
import { isExprOperand, OperandsTreeBuilder, OperatorDef } from '../operands-tree-builder';
import { Tokenizer } from '../tokenizer-def';
import { AstToken, buildExpressionTree, ExprAst, FnDeclAst, printExpr } from './ast-parser';
import { jsonPresets } from './json-parser';
import { tsOperators } from './ts-ast-parser';
import unicodeRanges from './unicode-letters-ranges.json';

const { firstLetter: firstLetterRanges, notFirstLetterAdditional: notFirstLetterAdditionalRanges } =
  unicodeRanges as unknown as {
    firstLetter: readonly [number, number][];
    notFirstLetterAdditional: readonly [number, number][];
  };

const parts = {
  get justWs() {
    return once(this, `justWs`, true, $t.cps(` \t`).mute());
  },
  get extraIdentifierChars() {
    return once(this, `extraIdentifierChars`, true, $t.cps(`_$`).mute());
  },
  get identifierStart() {
    return once(
      this,
      `identifierStart`,
      true,
      $t.or([$t.cpRanges(firstLetterRanges), this.extraIdentifierChars])
    );
  },
  get identifierPart() {
    return once(
      this,
      `identifierPart`,
      true,
      $t.or([this.identifierStart, $t.cpRanges(notFirstLetterAdditionalRanges)])
    );
  },

  get terminator() {
    return once(this, `terminator`, true, $t.or([$t.eof(), $t.look($t.not(this.identifierPart))]));
  },

  get lineComment() {
    return once(
      this,
      `lineComment`,
      true,
      $t.seq($t.keywords([`//`]).mute(), $t.repeat($t.notCps(`\n`), 0)).pipe(
        ([, r]) =>
          ({
            kind: `lineComment`,
            text: String.fromCodePoint(...r.map(r => r.cp)),
          }) as const
      )
    );
  },

  get multilineComment() {
    return once(
      this,
      `multilineComment`,
      true,
      $t
        .seq(
          $t.keywords([`/*`]).mute(),
          $t.repeat($t.not($t.keywords([`*/`])), 0)(r => String.fromCodePoint(...r.map(r => r.cp))),
          $t.keywords([`*/`]).mute()
        )
        .pipe(
          ([, s]) =>
            ({
              kind: `multilineComment`,
              text: s,
            }) as const
        )
    );
  },
  get whitespaces() {
    return once(
      this,
      `whitespaces`,
      true,
      $t.repeat(
        $t.or([this.justWs, this.lineComment, this.multilineComment, $t.cps(`\n`).mute()]),
        0
      )(r => r.filter(isDefined))
    );
  },

  get identifier() {
    return once(
      this,
      `identifier`,
      true,
      $t
        .seq(this.identifierStart, $t.repeat($t.seq(this.identifierPart).mute(), 0).mute(), this.terminator)
        .mute()
        .pipe((_none, info) => ({ kind: `identifier`, name: $u.nodeText(info) }) as const)
    );
  },

  get simpleString() {
    return once(
      this,
      `simpleString`,
      true,
      $t.or(
        ([`"`, `'`] as const).map(quote => {
          const escape = jsonPresets.escape(quote);
          const q = $t.cps(quote).mute();
          const content = $t.repeat(
            $t.or([
              escape,
              $t.repeat($t.notCps(quote + `\\`), 1)(r => String.fromCodePoint(...r.map(r => r.cp))),
            ]),
            0
          );
          return $t.seq(
            q,
            content,
            q
          )(
            ([, s]) =>
              ({
                kind: `string`,
                value: s.join(``),
              }) as const
          );
        })
      )
    );
  },

  get expressions() {
    const functionDecl: Tokenizer<FnDeclAst> = $t.seq(
      $t.keywords([`function`]).mute(),
      this.whitespaces,
      this.identifier,
      $t.maybe(this.whitespaces),
      this.parenExprsByType.round,
      $t.maybe(this.whitespaces),
      this.parenExprsByType.curly
    )(
      ([, , identifier, , args, , body]) =>
        ({
          kind: `functionDecl`,
          identifier,
          args,
          body,
        }) as const
    );

    return once(
      this,
      `expressions`,
      true,
      $t.repeat(
        $t.seq(
          $t.or([
            functionDecl,
            $t.seq(
              defineTsLang.expression,
              $t.maybe(parts.whitespaces),
              $t.or([$t.eof(), $t.cps(`;`).mute()])
            )(([e]) => e),
          ]),
          $t.maybe(parts.whitespaces)
        )(([e]) => e),
        0
      )
    );
  },

  get parenExprsByType() {
    const [curly, round, square] = (
      [
        [`{`, `}`],
        [`(`, `)`],
        [`[`, `]`],
      ] as const
    ).map(([open, close]) =>
      $t.seq(
        $t.cps(open).mute(),
        $t.maybe(this.whitespaces),
        () => $t.maybe(this.expressions),
        $t.maybe(this.whitespaces),
        $t.cps(close).mute()
      )(
        ([, , e]) =>
          ({
            kind: `paren`,
            open,
            close,
            data: e.item ?? null,
          }) as const
      )
    );
    return once(this, `parenExprsByType`, true, { curly, round, square });
  },

  get parenExpr() {
    const { curly, round, square } = this.parenExprsByType;
    return once(this, `parenExpr`, true, $t.or([curly, round, square]));
  },

  get operatorsDefs() {
    return once(
      this,
      `operatorsDefs`,
      true,
      tsOperators().filter(o => o.symbol !== `;`)
    );
  },

  get operator() {
    const kws = this.operatorsDefs.filter(o => o.requireSpaces);
    const ops = this.operatorsDefs.filter(o => !o.requireSpaces);

    return once(
      this,
      `operator`,
      true,
      $t.or([
        $t
          .keywords(ops.map(o => o.symbol).filter(isTruthy))
          .pipe(r => ({ kind: `op`, symbol: r.match }) as const),
        $t.seq(
          $t
            .keywords(kws.map(o => o.symbol).filter(isTruthy))
            .pipe(r => ({ kind: `op`, symbol: r.match }) as const),
          $t.look(
            $t.not($t.or([$t.cpRanges(firstLetterRanges), $t.cpRanges(notFirstLetterAdditionalRanges)]))
          )
        )(([k]) => k),
      ])
    );
  },
} as const;

const tsPrimitives = (() => {
  const [tCodePoint] = Array.from(`t`, c => c.codePointAt(0)!);

  const boolean = $t.seq($t.keywords([`true`, `false`]), parts.terminator).pipe(
    ([r]) =>
      ({
        kind: `boolean`,
        value: r.match.codePointAt(0) === tCodePoint,
      }) as const
  );

  const nully = $t.seq($t.keywords([`null`]), parts.terminator).pipe(
    () =>
      ({
        kind: `null`,
      }) as const
  );
  const undefinedly = $t.seq($t.keywords([`undefined`]), parts.terminator).pipe(
    () =>
      ({
        kind: `undefined`,
      }) as const
  );

  return { boolean, nully, undefinedly };
})();

const tsNumber = (() => {
  const dot = $t.cps(`.`).mute();
  const zero = $t.cps(`0`).mute();
  const bInfix = $t.cps(`bB`).mute();
  const oInfix = $t.cps(`oO`).mute();
  const hInfix = $t.cps(`xX`).mute();
  const n = $t.cps(`n`).mute();

  const decimalDigit = $t.cp(b => b.range(`09`)).mute();
  const nonZeroDigit = $t.cp(b => b.range(`19`)).mute();
  const binaryDigit = $t.cps(`01`).mute();
  const octalDigit = $t.cp(r => r.range(`07`)).mute();
  const hexDigit = $t.cp(b => b.digits().range(`af`).range(`AF`)).mute();
  const exponentIndicator = $t.cps(`eE`).mute();

  const spacing = $t.maybe($t.cps(`_`).mute()).mute();

  const decimalDigits = $t.seq(decimalDigit, $t.repeat($t.seq(spacing, decimalDigit).mute(), 0).mute());

  const decimalIntegerLiteral = $t.or([zero, $t.seq(nonZeroDigit, $t.maybe(decimalDigits))]);

  const exponentPart = $t.seq(exponentIndicator, $t.maybe($t.cps(`+-`).mute()), decimalDigits);

  const binaryDigits = $t.seq(binaryDigit, $t.repeat($t.seq(spacing, binaryDigit).mute(), 0).mute());
  const octalDigits = $t.seq(octalDigit, $t.repeat($t.seq(spacing, octalDigit).mute(), 0).mute());
  const hexDigits = $t.seq(hexDigit, $t.repeat($t.seq(spacing, hexDigit).mute(), 0).mute());

  const binaryIntegerLiteral = $t.seq(zero, bInfix, binaryDigits);
  const octalIntegerLiteral = $t.seq(zero, oInfix, octalDigits);
  const hexIntegerLiteral = $t.seq(zero, hInfix, hexDigits);

  const decimalLiteral = $t.or([
    $t.seq(decimalIntegerLiteral, dot, $t.maybe(decimalDigits), $t.maybe(exponentPart)),
    $t.seq(dot, decimalDigits, $t.maybe(exponentPart)),
    $t.seq(decimalIntegerLiteral, $t.maybe(exponentPart)),
  ]);

  const bigIntLiteral = $t.or([
    $t.seq(decimalDigits, n),
    $t.seq(zero, bInfix, binaryDigits, n),
    $t.seq(zero, oInfix, octalDigits, n),
    $t.seq(zero, hInfix, hexDigits, n),
  ]);

  const numericLiteral = $t.or([
    bigIntLiteral,
    decimalLiteral,
    binaryIntegerLiteral,
    octalIntegerLiteral,
    hexIntegerLiteral,
  ])((_none, info) => ({ kind: 'number', raw: $u.nodeText(info) }) as const);

  return { decimalDigits, numericLiteral };
})();

const defineTsLang = (() => {
  const { undefinedly, nully, boolean } = tsPrimitives;
  const { numericLiteral } = tsNumber;
  const { identifier, whitespaces, simpleString } = parts;

  const operand = $t.or([
    identifier,
    undefinedly,
    nully,
    boolean,
    numericLiteral,
    simpleString,
    () => parts.parenExpr,
  ]);

  const createExprGen = (definitions: OperatorDef[]) => {
    const fnOp = notNull(definitions.find(d => d.description.startsWith(`#call`)));
    const accOp = notNull(definitions.find(d => d.description.startsWith(`#access`)));

    return () =>
      new OperandsTreeBuilder<AstToken>(definitions, (_left, right) => {
        if (right.kind !== `paren`) {
          throw new Error(`invalid syntax: sequential operands are not function call or bracket-access`);
        }
        return right.open === `(` ? fnOp : accOp;
      });
  };

  const expression: Tokenizer<ExprAst> = $t.seq(
    $t.or([parts.operator, operand]),
    $t.repeat(
      $t.seq($t.maybe(whitespaces), $t.or([parts.operator, operand]))(([, r]) => r),
      0
    ),
    $t.maybe(parts.whitespaces),
    $t.look($t.or([$t.eof(), $t.cps(`;)]}`).mute()]))
  )(
    ([first, rest]) =>
      ({
        kind: `expression`,
        data: buildExpressionTree(createExprGen(parts.operatorsDefs), [first, ...rest]),
      }) as const
  );

  return { expression };
})();

const unpad = (s: string) =>
  s
    .split(`\n`)
    .map(s => s.trim())
    .join(`\n`);

describe('ts parser', () => {
  test.skip('first', () => {
    const { expression } = defineTsLang;
    // console.log(printExpr(testParse(`(0+1,2+3,4+5,6+7)`, Expression).result));

    expect(
      unpad(
        printExpr(
          $t.run(`(a, b, c, d) => 0, 2, (1 +2, 2+ 3); e(1) ,123.2+ (a + 2, 4, 3-2)*456`, expression).result
        )
      )
    ).toBe(
      unpad(`(;
      (,
        (, (=> (, (, (, a b) c) d) 0) 2)
        (, (+ 1 2) (+ 2 3))
      )
      (,
        (#call e 1)
        (+ 123.2 (* (, (, (+ a 2) 4) (- 3 2)) 456))
      )
    )`)
    );

    expect(
      unpad(
        printExpr(
          $t.run(
            `a(), a[1234]; a[1234 - 2], a[1234 + 1]; 1+ a[((1234 + 1), (4 / 4))], (1 + a)[123, 2]`,
            expression
          ).result
        )
      )
    ).toBe(
      unpad(`(;
      (;
        (, (#call a) (#get a 1234))
        (, (#get a (- 1234 2)) (#get a (+ 1234 1)))
      )
      (,
        (+ 1 (#get a (, (+ 1234 1) (/ 4 4))))
        (#get (+ 1 a) (, 123 2))
      )
    )`)
    );
  });

  it(`parsing whitespaces with comments`, () => {
    const { lineComment, multilineComment, whitespaces } = parts;

    testParser(`// aa*a\n \n 123`, lineComment, {
      length: 7,
      result: { kind: 'lineComment', text: ' aa*a' },
    });
    testParser(`// aa*a`, lineComment, {
      length: 7,
      result: { kind: 'lineComment', text: ' aa*a' },
    });

    testParser(`/* aa*a\n */\n 123`, multilineComment, {
      length: 11,
      result: { kind: 'multilineComment', text: ' aa*a\n ' },
    });
    testParser(`/* aa*a\n */`, multilineComment, {
      length: 11,
      result: { kind: 'multilineComment', text: ' aa*a\n ' },
    });

    expect(() => {
      $t.run(`/* aa*a\n`, multilineComment, { allowPartial: true });
    }).toThrow(`unexpected end of input`);

    testParser(`  /* aa*a\n */\n // 123 \n abc`, whitespaces, {
      length: 24,
      result: [
        { kind: 'multilineComment', text: ' aa*a\n ' },
        { kind: 'lineComment', text: ' 123 ' },
      ],
    });
  });

  it(`parsing primitive scalars`, () => {
    const { undefinedly, nully, boolean } = tsPrimitives;

    expect(() => {
      testParser(`truea`, boolean, { length: 4, result: { kind: `boolean`, value: true } });
    }).toThrow();
    testParser(`true 123`, boolean, { length: 4, result: { kind: `boolean`, value: true } });
    testParser(`false 123`, boolean, { length: 5, result: { kind: `boolean`, value: false } });
    testParser(`null 123`, nully, { length: 4, result: { kind: `null` } });
    testParser(`undefined 123`, undefinedly, { length: 9, result: { kind: `undefined` } });

    const { numericLiteral } = tsNumber;

    testParser(`0`, numericLiteral, { length: 1, result: { kind: 'number', raw: `0` } });
    testParser(`123`, numericLiteral, { length: 3, result: { kind: 'number', raw: `123` } });
    testParser(`123.123`, numericLiteral, { length: 7, result: { kind: 'number', raw: '123.123' } });
    testParser(`.123`, numericLiteral, { length: 4, result: { kind: 'number', raw: '.123' } });
    testParser(`123.456e-7`, numericLiteral, { length: 10, result: { kind: 'number', raw: '123.456e-7' } });
    testParser(`.456e-7`, numericLiteral, { length: 7, result: { kind: 'number', raw: '.456e-7' } });

    const { identifier } = parts;

    testParser(`a`, identifier, { length: 1, result: { kind: `identifier`, name: `a` } });
    testParser(`a+`, identifier, { length: 1, result: { kind: `identifier`, name: `a` } });
    testParser(`a +`, identifier, { length: 1, result: { kind: `identifier`, name: `a` } });
    testParser(`abc123`, identifier, { length: 6, result: { kind: `identifier`, name: `abc123` } });
    testParser(`abc123+`, identifier, { length: 6, result: { kind: `identifier`, name: `abc123` } });
    testParser(`abc123 +`, identifier, { length: 6, result: { kind: `identifier`, name: `abc123` } });
    testParser(`_bc123`, identifier, { length: 6, result: { kind: `identifier`, name: `_bc123` } });
    testParser(`$bc123`, identifier, { length: 6, result: { kind: `identifier`, name: `$bc123` } });
    expect(() => {
      testParser(`1bc`, identifier, { length: 6, result: { kind: `identifier`, name: `$bc123` } });
    }).toThrow();
  });

  it(`parsing string literals`, () => {
    const { simpleString } = parts;

    testParser(`"abc\\u1234"`, simpleString, { length: 11, result: { kind: `string`, value: `abcሴ` } });
    testParser(`'abc\\''`, simpleString, { length: 7, result: { kind: `string`, value: `abc'` } });
  });

  it.skip(`parsing expression`, () => {
    const { expression } = defineTsLang;

    const buildAst = (e: ExprAst) => {
      if (isExprOperand(e)) {
      }
    };

    console.dir($t.run(`function abc( a ){}`, parts.expressions).result, { depth: null });
    // console.dir($t.run(`function abc() {  a; } 123 ; a.b()`, parts.expressions).result, { depth: null });
    // console.dir($t.run(`(123) + a.b() * 789`, expression, { allowPartial: true }).result, { depth: null });
    // console.dir($t.run(`123 + 456 * 789`, expression, { allowPartial: true }).result, { depth: null });
    // console.dir($t.run(`( 123 + 456 ) * 789`, expression, { allowPartial: true }).result, { depth: null });
    // console.dir($t.run(`await()`, expression, { allowPartial: true }).result, { depth: null });
  });
});
