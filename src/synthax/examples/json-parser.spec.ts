import { $t } from '../define';
import { defineJsonParser } from './json-parser';

describe('json-parser', () => {
  test('parse', () => {
    const { root } = defineJsonParser();

    // console.dir(jsonPresets.ws1.ebnf(), { depth: null });

    console.dir($t.run(`{"a":1.23,"b":true,"c":{"d":"ade"}, "e": [null, false]}`, root), { depth: null });
    // console.dir($t.run(`{"a": flalse}`, root), { depth: null });
  });
});
