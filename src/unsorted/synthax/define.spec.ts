import { $t, testParser } from './define';
import { jsonPresets } from './examples/json-parser';

describe(`define cps, seq, repeat`, () => {
  test(`basics`, () => {
    const letter = $t.cps(`abc`);

    testParser(`abb`, letter, { length: 1, result: { cp: 97 } });
    testParser(`baa`, letter, { length: 1, result: { cp: 98 } });

    const letters = $t.repeat(letter, 1).pipe(r => r.map(r => r.cp));
    testParser(`abb cad`, letters, { length: 3, result: [97, 98, 98] });

    const word = letters.pipe(w => String.fromCodePoint(...w));

    const ws = $t.cp(b => b.any(` `)).mute();
    const sentence = $t
      .seq(
        word,
        $t.repeat(
          $t.seq(ws, word).pipe(([, w]) => w),
          0
        )
      )
      .pipe(([first, rest]) => [first, ...rest]);

    expect(() => $t.run(`abb cab. jhg`, sentence)).toThrow(`partially matched`);
    testParser(`abb cab. jhg`, sentence, { length: 7, result: [`abb`, `cab`] });
  });

  test(`define quoted string`, () => {
    testParser(
      `"ab\\u1234cd\\\\\\"'efg'"`,
      jsonPresets.stringLiteral(`"`)(r => r.join('')),
      { length: 21, result: `abሴcd\\"'efg'` }
    );
  });

  test(`throw inside pipe`, () => {
    const or = $t.or([$t.keywords([`some`]), $t.failure(`fail123`)]);
    expect(() => $t.run(`none`, or)).toThrow(`fail123`);

    const repeat = $t.repeat($t.failure(`fail123`), 0);
    expect(() => $t.run(`none`, repeat)).toThrow(`fail123`);

    const maybe = $t.maybe($t.failure(`fail123`));
    expect(() => $t.run(`none`, maybe)).toThrow(`fail123`);
  });

  test(`keywords matching longest`, () => {
    testParser(`somehow`, $t.keywords([`some`, `someone`]), { length: 4, result: { match: `some` } });
    testParser(`someoneelse`, $t.keywords([`some`, `someone`]), { length: 7, result: { match: `someone` } });
  });
});
