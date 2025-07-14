import { $t } from './define';
import { jsonPresets } from './examples/json-parser';
import { AnyAst, Tokenizer, TokenizerResult } from './tokenizer-def';

const testParser = <Ast extends AnyAst>(
  input: string,
  tokenizer: Tokenizer<Ast>,
  expectation: Omit<TokenizerResult<Ast>, `source` | `pos`>
) => {
  expect($t.run(input, tokenizer, { allowPartial: true })).toStrictEqual({
    source: input,
    pos: 0,
    ...expectation,
  });
};

describe(`define cps, seq, repeat`, () => {
  test(`basics`, () => {
    const letter = $t.cps(`abc`);

    testParser(`abb`, letter, { length: 1, result: { cp: 97 } });
    testParser(`baa`, letter, { length: 1, result: { cp: 98 } });

    const letters = $t.repeat(letter, 1).pipe(r => r.map(r => r.cp));
    testParser(`abb cad`, letters, { length: 3, result: [97, 98, 98] });

    const word = letters.pipe(w => String.fromCodePoint(...w));

    const ws = $t.cps(` `).mute();
    const sentence = $t
      .seq(
        word,
        $t.repeat(
          $t.seq(ws, word).pipe(([, w]) => w),
          0
        )
      )
      .pipe(([first, rest]) => [first, ...rest]);

    testParser(`abb cab. jhg`, sentence, { length: 7, result: [`abb`, `cab`] });
  });

  test(`define quoted string`, () => {
    testParser(
      `"ab\\u1234cd\\\\\\"'efg'"`,
      jsonPresets.stringLiteral(`"`)(r => r.join('')),
      { length: 21, result: `abሴcd\\"'efg'` }
    );
  });
});
