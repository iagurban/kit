import { $t } from '../define';
import { defineJsonParser } from './json-parser';

describe('json-parser', () => {
  test('parse', () => {
    const { root } = defineJsonParser();

    expect(
      $t.run(
        `{"a":1.23,"b":true,"c":{"d":"ade"}, "e": [null, false],"f": 123.45, "g": -2324.42, "h\\u2454": "string\\u8563z"}`,
        root
      )
    ).toMatchObject({
      length: 110,
      result: {
        a: 1.23,
        b: true,
        c: { d: 'ade' },
        e: [null, false],
        f: 123.45,
        g: -2324.42,
        'h\u2454': 'string\u8563z',
      },
    });

    expect($t.run(`"a"`, root)).toMatchObject({ length: 3, pos: 0, result: 'a' });

    expect(() => {
      $t.run(`{"a": flalse}`, root);
    }).toThrow();
  });
});
