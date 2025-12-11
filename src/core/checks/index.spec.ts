import {
  isDefined,
  isNotNull,
  isNotUndefined,
  isNull,
  isNullish,
  isROArray,
  isTruthy,
  isUndefined,
  isSymbol,
  isError,
  isRegExp,
  isMap,
  isSet,
} from './basic';
import { checked } from './checked';
import { isArrayOf } from './is-array-of';
import { isAsyncFunction } from './is-async-function';
import { isAsyncGenerator } from './is-async-generator';
import { isAsyncIterable } from './is-async-iterable';
import { isAwaitable } from './is-awaitable';
import { isBigInt } from './is-bigint';
import { isBigIntOf } from './is-bigint-of';
import { isBoolean } from './is-boolean';
import { isBooleanOf } from './is-boolean-of';
import { isConstructor } from './is-constructor';
import { isDate } from './is-date';
import { isDateOf } from './is-date-of';
import { isFunction } from './is-function';
import { isGenerator } from './is-generator';
import { isGeneratorFunction } from './is-generator-function';
import { isInstanceOf } from './is-instance-of';
import { isInteger } from './is-integer';
import { isInvalidDate } from './is-invalid-date';
import { isIterable } from './is-iterable';
import { isIterableIterator } from './is-iterable-iterator';
import { isIterator } from './is-iterator';
import { isIteratorResult } from './is-iterator-result';
import { isNaN as isNaNNumber } from './is-nan';
import { isNumber } from './is-number';
import { isNumberOf } from './is-number-of';
import { isPlainObject } from './is-plain-object';
import { isPromise } from './is-promise';
import { isPromiseInstance } from './is-promise-instance';
import { isRecordOf } from './is-record-of';
import { isShape } from './is-shape';
import { isSomeObject } from './is-some-object';
import { isSomeOf } from './is-some-of';
import { isString } from './is-string';
import { isStringOf } from './is-string-of';
import { isTuple } from './is-tuple';
import { isTuples } from './is-tuples';
import { buildDesc, checkerType, tagChecker, tagCheckerGetter } from './util';
import { validator, validator0 } from './validator';

describe('Type Checks', () => {
  describe('isDefined', () => {
    it('should return true for defined values', () => {
      expect(isDefined(0)).toBe(true);
      expect(isDefined('')).toBe(true);
      expect(isDefined(false)).toBe(true);
      expect(isDefined({})).toBe(true);
    });

    it('should return false for null and undefined', () => {
      expect(isDefined(null)).toBe(false);
      expect(isDefined(undefined)).toBe(false);
    });
  });

  describe('isNotUndefined', () => {
    it('should return true for defined values including null', () => {
      expect(isNotUndefined(0)).toBe(true);
      expect(isNotUndefined(null)).toBe(true);
      expect(isNotUndefined('')).toBe(true);
    });

    it('should return false for undefined', () => {
      expect(isNotUndefined(undefined)).toBe(false);
    });
  });

  describe('primitive checkers (boolean, bigint, function)', () => {
    it('isBoolean', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
      expect(isBoolean('true')).toBe(false);
      expect(isBoolean(0)).toBe(false);
    });

    it('isBigInt', () => {
      expect(isBigInt(1n)).toBe(true);
      expect(isBigInt(BigInt(0))).toBe(true);
      expect(isBigInt(1)).toBe(false);
      expect(isBigInt('1')).toBe(false);
    });

    it('isFunction', () => {
      function f() {}
      const g = () => {};

      const h = new Function('return 1;');
      expect(isFunction(f)).toBe(true);
      expect(isFunction(g)).toBe(true);
      expect(isFunction(h)).toBe(true);
      expect(isFunction({})).toBe(false);
    });

    it('isConstructor', () => {
      class C {}
      function F() {}
      const arrow = () => {};
      function* GF() {
        yield 1;
      }
      expect(isConstructor(C)).toBe(true);
      expect(isConstructor(F)).toBe(true);
      expect(isConstructor(arrow)).toBe(false);
      expect(isConstructor(GF)).toBe(false);
      expect(isConstructor({})).toBe(false);
    });
  });

  describe('boolean-of', () => {
    it('works with no options (default {})', () => {
      const anyBool = isBooleanOf();
      expect(anyBool(true)).toBe(true);
      expect(anyBool(false)).toBe(true);
      expect(anyBool('true' as any)).toBe(false);
      // No constraints should be appended
      expect(checkerType(anyBool)).toBe('boolean');
    });

    it('should filter by exact value', () => {
      const isTrue = isBooleanOf({ value: true });
      expect(isTrue(true)).toBe(true);
      expect(isTrue(false)).toBe(false);
      expect(isTrue('true')).toBe(false as any);
      // Access type description to cover buildDesc branches
      expect(checkerType(isTrue)).toBe('boolean(is:true)');
    });

    it('should support custom check', () => {
      const isAlsoTrue = isBooleanOf({ check: v => v === true, checkName: 'alsoTrue' });
      expect(isAlsoTrue(true)).toBe(true);
      expect(isAlsoTrue(false)).toBe(false);
      expect(checkerType(isAlsoTrue)).toBe('boolean(alsoTrue)');
    });

    it('uses default "custom" label when checkName is not provided', () => {
      const truthy = isBooleanOf({ check: v => v });
      expect(truthy(true)).toBe(true);
      expect(truthy(false)).toBe(false);
      expect(checkerType(truthy)).toBe('boolean(custom)');
    });
  });

  describe('bigint-of', () => {
    it('works with no options (default {})', () => {
      const anyBig = isBigIntOf();
      expect(anyBig(0n)).toBe(true);
      expect(anyBig(BigInt(123))).toBe(true);
      expect(anyBig(123 as any)).toBe(false);
      // No constraints should be appended
      expect(checkerType(anyBig)).toBe('bigint');
    });

    it('min/max and fitsInNumber', () => {
      const chk = isBigIntOf({ min: 2, max: 5n });
      expect(chk(2n)).toBe(true);
      expect(chk(5n)).toBe(true);
      expect(chk(1n)).toBe(false);
      expect(chk(6n)).toBe(false);
      // Cover description branches for min/max
      expect(checkerType(chk)).toBe('bigint(>=2, <=5)');

      const safe = isBigIntOf({ fitsInNumber: true });
      expect(safe(BigInt(Number.MAX_SAFE_INTEGER))).toBe(true);
      expect(safe(BigInt(Number.MAX_SAFE_INTEGER) + 1n)).toBe(false);
      expect(checkerType(safe)).toBe('bigint(fitsInNumber)');
    });

    it('custom check', () => {
      const even = isBigIntOf({ check: v => v % 2n === 0n, checkName: 'even' });
      expect(even(4n)).toBe(true);
      expect(even(3n)).toBe(false);
      expect(checkerType(even)).toBe('bigint(even)');
    });

    it('custom check without name uses default label', () => {
      const odd = isBigIntOf({ check: v => v % 2n !== 0n });
      expect(odd(3n)).toBe(true);
      expect(odd(4n)).toBe(false);
      expect(checkerType(odd)).toBe('bigint(custom)');
    });
  });

  describe('string-of', () => {
    it('works with no options (default {})', () => {
      const anyStr = isStringOf();
      expect(anyStr('')).toBe(true);
      expect(anyStr('hello')).toBe(true);
      expect(anyStr(1 as any)).toBe(false);
      // No constraints should be appended
      expect(checkerType(anyStr)).toBe('string');
    });

    it('min/max length and pattern', () => {
      const chk = isStringOf({ minLength: 2, maxLength: 4, pattern: /^[a-z]+$/ });
      expect(chk('ab')).toBe(true);
      expect(chk('abcd')).toBe(true);
      expect(chk('a')).toBe(false);
      expect(chk('abcde')).toBe(false);
      expect(chk('AB')).toBe(false);
      expect(checkerType(chk)).toBe(`string(len>=2, len<=4, matches:/^[a-z]+$/)`);
    });

    it('enum of values', () => {
      const color = isStringOf({ values: ['red', 'green', 'blue'] as const });
      expect(color('red')).toBe(true);
      expect(color('yellow' as any)).toBe(false);
      expect(checkerType(color)).toBe('string(enum)');
    });

    it('custom check with name affects description', () => {
      const nonEmpty = isStringOf({ check: s => s.length > 0, checkName: 'nonEmpty' });
      expect(nonEmpty('x')).toBe(true);
      expect(nonEmpty('')).toBe(false);
      expect(checkerType(nonEmpty)).toBe('string(custom)'.replace('custom', 'nonEmpty'));
    });

    it('custom check without name uses default label', () => {
      const nonEmptyUnnamed = isStringOf({ check: s => s.length > 0 });
      expect(nonEmptyUnnamed('x')).toBe(true);
      expect(nonEmptyUnnamed('')).toBe(false);
      expect(checkerType(nonEmptyUnnamed)).toBe('string(custom)');
    });
  });

  describe('number-of', () => {
    it('works with no options (default {})', () => {
      const anyNum = isNumberOf();
      expect(anyNum(0)).toBe(true);
      expect(anyNum(123.45)).toBe(true);
      expect(anyNum('1' as any)).toBe(false);
      // No constraints should be appended
      expect(checkerType(anyNum)).toBe('number');
    });

    it('range, exclusivity, integer/finite/safe', () => {
      const r1 = isNumberOf({ min: 1, max: 3 });
      expect(r1(1)).toBe(true);
      expect(r1(3)).toBe(true);
      expect(r1(0.9)).toBe(false);
      expect(r1(3.1)).toBe(false);

      const r2 = isNumberOf({ min: 1, max: 3, exclusiveMin: true, exclusiveMax: true });
      expect(r2(2)).toBe(true);
      expect(r2(1)).toBe(false);
      expect(r2(3)).toBe(false);
      // Description should reflect strict inequalities
      expect(checkerType(r2)).toBe('number(>1, <3)');

      const int = isNumberOf({ integer: true });
      expect(int(2)).toBe(true);
      expect(int(2.5)).toBe(false);

      const finite = isNumberOf({ finite: true });
      expect(finite(1)).toBe(true);
      expect(finite(Infinity)).toBe(false);

      const safe = isNumberOf({ safe: true });
      expect(safe(Number.MAX_SAFE_INTEGER)).toBe(true);
      expect(safe(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
      expect(checkerType(finite)).toBe('number(finite)');
      expect(checkerType(safe)).toBe('number(safe)');
    });

    it('custom check with name is reflected in type', () => {
      const even = isNumberOf({ integer: true, check: n => n % 2 === 0, checkName: 'even' });
      expect(even(4)).toBe(true);
      expect(even(5)).toBe(false);
      expect(checkerType(even)).toBe('number(int, custom)'.replace('custom', 'even'));
    });

    it('custom check without name uses default label', () => {
      const odd = isNumberOf({ check: n => n % 2 === 1 });
      expect(odd(3)).toBe(true);
      expect(odd(4)).toBe(false);
      expect(checkerType(odd)).toBe('number(custom)');
    });
  });

  describe('date, date-of and invalid-date', () => {
    it('isDate and isInvalidDate', () => {
      expect(isDate(new Date())).toBe(true);
      expect(isInvalidDate(new Date('invalid'))).toBe(true);
      expect(isDate(new Date('invalid'))).toBe(false);
      expect(isInvalidDate(new Date())).toBe(false);
    });

    it('isDateOf with min/max and validity', () => {
      const d1 = new Date('2024-01-01T00:00:00.000Z');
      const d2 = new Date('2024-06-01T00:00:00.000Z');
      const d3 = new Date('2024-12-31T00:00:00.000Z');
      const inRange = isDateOf({ min: d1, max: d3 });
      expect(inRange(d2)).toBe(true);
      expect(inRange(new Date('2023-12-31T00:00:00.000Z'))).toBe(false);
      expect(inRange(new Date('2025-01-01T00:00:00.000Z'))).toBe(false);
      // access description that includes min/max iso strings
      const type = checkerType(inRange);
      expect(type.startsWith('date(valid, >=')).toBe(true);
      expect(type.includes('<=')).toBe(true);

      const allowInvalid = isDateOf({ allowInvalid: true });
      expect(allowInvalid(new Date('invalid'))).toBe(true);
      expect(allowInvalid(new Date())).toBe(true);

      const withCustom = isDateOf({ check: d => d.getUTCFullYear() === 2024, checkName: 'y2024' });
      expect(withCustom(new Date('2024-05-05T00:00:00.000Z'))).toBe(true);
      expect(withCustom(new Date('2023-05-05T00:00:00.000Z'))).toBe(false);
      // Named custom check should appear in description
      expect(checkerType(withCustom)).toBe('date(valid, y2024)');
    });

    it('isDateOf description shows valid or allowInvalid', () => {
      expect(checkerType(isDateOf())).toBe('date(valid)');
      expect(checkerType(isDateOf({ allowInvalid: true }))).toBe('date(allowInvalid)');
    });

    it('isDateOf custom without name uses default label', () => {
      const unnamed = isDateOf({ check: d => d.getUTCMonth() === 0 }); // January
      expect(unnamed(new Date('2024-01-15T00:00:00.000Z'))).toBe(true);
      expect(unnamed(new Date('2024-02-01T00:00:00.000Z'))).toBe(false);
      expect(checkerType(unnamed)).toBe('date(valid, custom)');
    });
  });

  describe('promise/awaitable', () => {
    it('isPromiseInstance vs isPromise', async () => {
      const p = Promise.resolve(1);
      expect(isPromiseInstance(p)).toBe(true);
      expect(isPromise(p)).toBe(true);

      const thenable = { then: (res: (v: number) => void) => res(2), catch: () => {}, finally: () => {} };
      expect(isPromiseInstance(thenable)).toBe(false);
      expect(isPromise(thenable)).toBe(true);
    });

    it('isAwaitable detects thenables', () => {
      expect(isAwaitable(Promise.resolve(1))).toBe(true);
      const thenOnly = { then: () => {} };
      expect(isAwaitable(thenOnly)).toBe(true);
      expect(isAwaitable({})).toBe(false);
    });
  });

  describe('async/generator/iterable/iterator family', () => {
    it('isAsyncFunction and isGeneratorFunction', () => {
      const af = async function x() {
        return 1;
      };
      function nf() {}
      function* gf() {
        yield 1;
      }
      expect(isAsyncFunction(af)).toBe(true);
      expect(isAsyncFunction(nf)).toBe(false);
      expect(isGeneratorFunction(gf)).toBe(true);
      expect(isGeneratorFunction(nf)).toBe(false);
    });

    it('isIterable / isIterator / isIterableIterator', () => {
      const arr = [1, 2, 3];
      const it = arr[Symbol.iterator]();
      expect(isIterable(arr)).toBe(true);
      expect(isIterator(arr)).toBe(false);
      expect(isIterator(it)).toBe(true);
      expect(isIterableIterator(it)).toBe(true);

      expect(isIterable({})).toBe(false);
      expect(isIterator({})).toBe(false);
    });

    it('isGenerator and isAsyncIterable/isAsyncGenerator', async () => {
      function* g() {
        try {
          yield 1;
        } finally {
        }
      }
      const gi = g();
      expect(isGenerator(gi)).toBe(true);
      expect(isAsyncIterable(gi)).toBe(false);

      const ag = (async function* () {
        yield 1;
      })();
      expect(isAsyncIterable(ag)).toBe(true);
      expect(isAsyncGenerator(ag)).toBe(true);
    });

    it('isIteratorResult', () => {
      const r1 = { value: 1, done: false };
      const r2 = { value: undefined, done: true };
      expect(isIteratorResult(r1)).toBe(true);
      expect(isIteratorResult(r2)).toBe(true);
      expect(isIteratorResult({ value: 1 } as any)).toBe(false);
      expect(isIteratorResult({ done: false } as any)).toBe(false);
    });
  });

  describe('NaN checker', () => {
    it('isNaN (number NaN only)', () => {
      expect(isNaNNumber(NaN)).toBe(true);
      expect(isNaNNumber('NaN' as any)).toBe(false);
      expect(isNaNNumber(0 / 0)).toBe(true);
      expect(isNaNNumber(1)).toBe(false);
    });
  });

  describe('symbol/error/regexp/map/set', () => {
    it('isSymbol', () => {
      expect(isSymbol(Symbol())).toBe(true);
      expect(isSymbol(Symbol.for('x'))).toBe(true);
      expect(isSymbol('sym' as any)).toBe(false);
      expect(checkerType(isSymbol)).toBe('symbol');
    });

    it('isError', () => {
      expect(isError(new Error('e'))).toBe(true);
      expect(isError(new TypeError('t'))).toBe(true);
      expect(isError({} as any)).toBe(false);
      expect(isError('err' as any)).toBe(false);
      expect(checkerType(isError)).toBe('error');
    });

    it('isRegExp', () => {
      expect(isRegExp(/a/)).toBe(true);
      expect(isRegExp(new RegExp('a'))).toBe(true);
      expect(isRegExp('a' as any)).toBe(false);
      expect(isRegExp({} as any)).toBe(false);
      expect(checkerType(isRegExp)).toBe('regexp');
    });

    it('isMap', () => {
      expect(isMap(new Map())).toBe(true);
      const m = new Map<string, number>();
      m.set('a', 1);
      expect(isMap(m)).toBe(true);
      expect(isMap({} as any)).toBe(false);
      expect(isMap([] as any)).toBe(false);
      expect(checkerType(isMap)).toBe('map');
    });

    it('isSet', () => {
      expect(isSet(new Set())).toBe(true);
      const s = new Set<number>([1, 2]);
      expect(isSet(s)).toBe(true);
      expect(isSet([] as any)).toBe(false);
      expect(isSet({} as any)).toBe(false);
      expect(checkerType(isSet)).toBe('set');
    });
  });

  describe('array-of variants and descriptions', () => {
    it('works with no options (default {})', () => {
      const any = isArrayOf();
      expect(any([])).toBe(true);
      expect(any([1, 'a', {}])).toBe(true);
      expect(any({} as any)).toBe(false);
      // No constraints should be appended to the type label
      expect(checkerType(any)).toBe('unknown[]');
    });

    it('works without item checker and with custom check', () => {
      const anyArr = isArrayOf({ minLength: 1 });
      expect(anyArr([1, 'x'])).toBe(true);
      expect(anyArr([])).toBe(false);

      const sumAtLeast3 = isArrayOf<number>({
        check: a => a.reduce((s, x: any) => s + Number(x || 0), 0) >= 3,
        checkName: 'sum>=3',
      });
      expect(sumAtLeast3([1, 2])).toBe(true);
      expect(sumAtLeast3([1, 1])).toBe(false);
      expect(checkerType(anyArr)).toBe('unknown[](len>=1)');
      // custom check with provided name should reflect in description
      expect(checkerType(sumAtLeast3)).toBe('unknown[](sum>=3)');
    });

    it('respects maxLength constraint and reflects it in description', () => {
      const max2 = isArrayOf({ maxLength: 2 });
      expect(max2([])).toBe(true);
      expect(max2([1])).toBe(true);
      expect(max2([1, 2])).toBe(true);
      expect(max2([1, 2, 3])).toBe(false);
      expect(checkerType(max2)).toBe('unknown[](len<=2)');
    });

    it('uses default "custom" label when checkName is not provided', () => {
      const evenLen = isArrayOf<number>({
        check: a => a.length % 2 === 0,
      });
      expect(evenLen([1, 2])).toBe(true);
      expect(evenLen([1])).toBe(false);
      expect(checkerType(evenLen)).toBe('unknown[](custom)');
    });
  });

  describe('tuples/shape/record checkers', () => {
    it('isTuples with tuple items', () => {
      const check = isTuples(isString, isNumber);
      expect(
        check([
          ['a', 1],
          ['b', 2],
        ])
      ).toBe(true);
      expect(check([['a', 'b'] as any])).toBe(false);
    });

    it('isShape basic and exact', () => {
      const person = isShape({ name: isString, age: isNumber });
      expect(person({ name: 'Ann', age: 30 })).toBe(true);
      expect(person({ name: 'Ann', age: 'x' as any })).toBe(false);

      const exactPerson = isShape({ name: isString, age: isNumber }, { exact: true });
      expect(exactPerson({ name: 'Bob', age: 20 })).toBe(true);
      expect(exactPerson({ name: 'Bob', age: 20, extra: true } as any)).toBe(false);

      const adultNamedA = isShape(
        { name: isString, age: isNumber },
        { check: o => o.age >= 18 && o.name.startsWith('A'), checkName: 'adultA' }
      );
      expect(adultNamedA({ name: 'Alice', age: 18 })).toBe(true);
      expect(adultNamedA({ name: 'Bob', age: 18 })).toBe(false);
    });

    it('isShape description: lists keys for small shapes', () => {
      const s = isShape({ a: isNumber, b: isString });
      expect(checkerType(s)).toBe('{a, b}');
    });

    it('isShape description: includes exact flag', () => {
      const sExact = isShape({ a: isNumber, b: isString }, { exact: true });
      expect(checkerType(sExact)).toBe('{a, b}(exact)');
    });

    it('isShape description: includes named custom check', () => {
      const sNamed = isShape({ a: isNumber }, { check: o => o.a === 1, checkName: 'a==1' });
      expect(checkerType(sNamed)).toBe('{a}(a==1)');
    });

    it('isShape description: defaults custom label when checkName is missing', () => {
      const sCustom = isShape({ a: isNumber }, { check: o => o.a > 0 });
      expect(checkerType(sCustom)).toBe('{a}(custom)');
    });

    it('isShape description: truncates when more than 5 keys', () => {
      const sLarge = isShape({
        k1: isNumber,
        k2: isNumber,
        k3: isNumber,
        k4: isNumber,
        k5: isNumber,
        k6: isNumber,
      });
      expect(checkerType(sLarge)).toBe('{k1, k2, k3, k4, k5, ...}');
    });

    it('isShape description: includes both exact and named custom in order', () => {
      const sBoth = isShape({ a: isNumber }, { exact: true, check: o => o.a > 0, checkName: 'pos' });
      expect(checkerType(sBoth)).toBe('{a}(exact, pos)');
    });

    it('isRecordOf value and key checks and size limits', () => {
      const uuidLike = isStringOf({ pattern: /^[a-f0-9]{4}$/ });
      const valueNum = isNumberOf({ min: 0, max: 10 });
      const rec = isRecordOf<number>({ key: uuidLike, value: valueNum, minKeys: 1, maxKeys: 2 });
      expect(rec({ ab12: 5 } as any)).toBe(true);
      expect(rec({ ab12: 5, ff00: 3 } as any)).toBe(true);
      expect(rec({} as any)).toBe(false); // minKeys
      expect(rec({ ab12: 5, ff00: 3, 1234: 1 } as any)).toBe(false); // maxKeys exceeded (early false)
      expect(rec({ ab1z: 5 } as any)).toBe(false); // bad key
      expect(rec({ ab12: 100 } as any)).toBe(false); // bad value

      // Description should reflect key/value checkers and size limits
      expect(checkerType(rec)).toBe(
        'Record<string(matches:/^[a-f0-9]{4}$/), number(>=0, <=10)>(minKeys>=1, maxKeys<=2)'
      );

      const recCustom = isRecordOf<number>({ check: o => Object.keys(o).includes('ok'), checkName: 'hasOk' });
      expect(recCustom({ ok: 1 })).toBe(true);
      expect(recCustom({ no: 1 })).toBe(false);
      // Named custom check should appear in description
      expect(checkerType(recCustom)).toBe('Record<string, unknown>(hasOk)');
    });

    it('isRecordOf works with no options (default {})', () => {
      const anyRec = isRecordOf();
      expect(anyRec({})).toBe(true);
      expect(anyRec({ a: 1, b: 'x' })).toBe(true);
      expect(anyRec([] as any)).toBe(false);
      expect(anyRec(null as any)).toBe(false);
      // No key/value/size constraints — default description
      expect(checkerType(anyRec)).toBe('Record<string, unknown>');
    });

    it('isRecordOf custom check without name uses default label', () => {
      const recCustomDefault = isRecordOf({ check: o => 'x' in (o as Record<string, unknown>) });
      expect(recCustomDefault({ x: 1 })).toBe(true);
      expect(recCustomDefault({})).toBe(false);
      expect(checkerType(recCustomDefault)).toBe('Record<string, unknown>(custom)');
    });
  });

  describe('util: buildDesc', () => {
    it('returns base when called without constraints (default [])', () => {
      expect(buildDesc('base')).toBe('base');
    });
  });

  describe('util.buildDesc', () => {
    it('builds base when constraints empty and filters falsey', () => {
      expect(buildDesc('base', [])).toBe('base');
      // includes false, undefined and null — must be filtered out
      expect(buildDesc('x', [false, undefined, null, 'a', 1])).toBe('x(a, 1)');
    });
  });

  describe('isNotNull', () => {
    it('should return true for non-null values including undefined', () => {
      expect(isNotNull(0)).toBe(true);
      expect(isNotNull(undefined)).toBe(true);
      expect(isNotNull('')).toBe(true);
    });

    it('should return false for null', () => {
      expect(isNotNull(null)).toBe(false);
    });
  });

  describe('isTruthy', () => {
    it('should return true for truthy values', () => {
      expect(isTruthy(1)).toBe(true);
      expect(isTruthy('text')).toBe(true);
      expect(isTruthy({})).toBe(true);
      expect(isTruthy([])).toBe(true);
    });

    it('should return false for falsy values', () => {
      expect(isTruthy(0)).toBe(false);
      expect(isTruthy('')).toBe(false);
      expect(isTruthy(false)).toBe(false);
      expect(isTruthy(null)).toBe(false);
      expect(isTruthy(undefined)).toBe(false);
    });
  });

  describe('isUndefined', () => {
    it('should return true for undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined(0)).toBe(false);
      expect(isUndefined('')).toBe(false);
    });
  });

  describe('isNull', () => {
    it('should return true for null', () => {
      expect(isNull(null)).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isNull(undefined)).toBe(false);
      expect(isNull(0)).toBe(false);
      expect(isNull('')).toBe(false);
    });
  });

  describe('isNullish', () => {
    it('should return true for null and undefined', () => {
      expect(isNullish(null)).toBe(true);
      expect(isNullish(undefined)).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isNullish(0)).toBe(false);
      expect(isNullish('')).toBe(false);
      expect(isNullish({})).toBe(false);
    });
  });

  describe('isString/isNumber/isInteger', () => {
    it('should correctly identify strings', () => {
      expect(isString('')).toBe(true);
      expect(isString('text')).toBe(true);
      expect(isString(123)).toBe(false);
      expect(isString({})).toBe(false);
    });

    it('should correctly identify numbers', () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(0.5)).toBe(true);
      expect(isNumber('123')).toBe(false);
      expect(isNumber(NaN)).toBe(false);
    });

    it('should correctly identify integers', () => {
      expect(isInteger(123)).toBe(true);
      expect(isInteger(0)).toBe(true);
      expect(isInteger(-1)).toBe(true);
      expect(isInteger(0.5)).toBe(false);
      expect(isInteger('123')).toBe(false);
    });
  });

  describe('isPlainObject', () => {
    it('should identify plain objects', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject({ a: 1 })).toBe(true);
    });

    it('should reject non-plain objects', () => {
      class TestClass {}
      expect(isPlainObject(new TestClass())).toBe(false);
      expect(isPlainObject([])).toBe(false);
      expect(isPlainObject(null)).toBe(false);
    });
  });

  describe('isSomeObject', () => {
    it('should identify objects', () => {
      expect(isSomeObject({})).toBe(true);
      expect(isSomeObject({ a: 1 })).toBe(true);
      class TestClass {}
      expect(isSomeObject(new TestClass())).toBe(true);
    });

    it('should reject non-objects', () => {
      expect(isSomeObject([])).toBe(false);
      expect(isSomeObject(null)).toBe(false);
      expect(isSomeObject(undefined)).toBe(false);
      expect(isSomeObject(123)).toBe(false);
    });
  });

  describe('isROArray and isArray', () => {
    it('should identify arrays', () => {
      const arr = [1, 2, 3];
      const readonlyArr: readonly number[] = arr;
      expect(isROArray(arr)).toBe(true);
      expect(isROArray(readonlyArr)).toBe(true);
      expect(isROArray({})).toBe(false);
    });

    it('should validate array elements', () => {
      const isNumberArray = isArrayOf({ item: isNumber });
      expect(isNumberArray([1, 2, 3])).toBe(true);
      expect(isNumberArray([1, '2', 3])).toBe(false);
      expect(isNumberArray([])).toBe(true);
      expect(isNumberArray({})).toBe(false);
    });
  });

  describe('isInstanceOf', () => {
    class TestClass {}
    class ExtendedClass extends TestClass {}

    it('should check instance of single class', () => {
      const isTest = isInstanceOf(TestClass);
      expect(isTest(new TestClass())).toBe(true);
      expect(isTest(new ExtendedClass())).toBe(true);
      expect(isTest({})).toBe(false);
    });

    it('should check instance of multiple classes', () => {
      const isTestOrExtended = isInstanceOf(TestClass, ExtendedClass);
      expect(isTestOrExtended(new TestClass())).toBe(true);
      expect(isTestOrExtended(new ExtendedClass())).toBe(true);
      expect(isTestOrExtended({})).toBe(false);
    });
  });

  describe('isSomeOf', () => {
    it('should check if value matches any of the types', () => {
      const isStringOrNumber = isSomeOf(isString, isNumber);
      expect(isStringOrNumber('text')).toBe(true);
      expect(isStringOrNumber(123)).toBe(true);
      expect(isStringOrNumber({})).toBe(false);
    });
  });

  describe('isTuple and isTuples', () => {
    const isStringNumberTuple = isTuple(isString, isNumber);
    const isStringNumberTuples = isTuples(isString, isNumber);

    it('should validate tuples', () => {
      expect(isStringNumberTuple(['text', 123])).toBe(true);
      expect(isStringNumberTuple(['text', '123'])).toBe(false);
      expect(isStringNumberTuple(['text'])).toBe(false);
      expect(isStringNumberTuple({})).toBe(false);
    });

    it('should validate arrays of tuples', () => {
      expect(
        isStringNumberTuples([
          ['text', 123],
          ['other', 456],
        ])
      ).toBe(true);
      expect(isStringNumberTuples([['text', '123']])).toBe(false);
      expect(isStringNumberTuples([])).toBe(true);
    });
  });

  describe('checked', () => {
    it('should validate values with custom message', () => {
      const result = checked('text', isString, v => `Expected string, got ${typeof v}`);
      expect(result).toBe('text');

      expect(() => checked(123, isString, v => `Expected string, got ${typeof v}`)).toThrow(
        'Expected string, got number'
      );
    });

    it('should support type predicates', () => {
      const isPositive = (n: number): n is number => n > 0;
      const result = checked(5, isPositive, n => `Expected positive number, got ${n}`);
      expect(result).toBe(5);

      expect(() => checked(-1, isPositive, n => `Expected positive number, got ${n}`)).toThrow(
        'Expected positive number, got -1'
      );
    });

    it('should throw an Error object if message returns one', () => {
      const customError = new Error('Custom error object');
      expect(() => checked(123, isString, () => customError)).toThrow(customError);
    });
  });

  describe('Checker Type Field Generation', () => {
    it('should have correct types for basic checkers', () => {
      expect(checkerType(isDefined)).toBe('[defined]');
      expect(checkerType(isNotUndefined)).toBe('!undefined');
      expect(checkerType(isNotNull)).toBe('!null');
      expect(checkerType(isTruthy)).toBe('[truthy]');
      expect(checkerType(isUndefined)).toBe('undefined');
      expect(checkerType(isNull)).toBe('null');
      expect(checkerType(isNullish)).toBe('(null|undefined)');
      expect(checkerType(isString)).toBe('string');
      expect(checkerType(isNumber)).toBe('number');
      expect(checkerType(isInteger)).toBe('integer');
      expect(checkerType(isPlainObject)).toBe('plain-object');
      expect(checkerType(isSomeObject)).toBe('some-object');
      expect(checkerType(isROArray)).toBe('readonly-array');
    });

    it('should generate correct type for isArrayOf', () => {
      const isNumberArray = isArrayOf({ item: isNumber });
      expect(checkerType(isNumberArray)).toBe('number[]');
      const isStringArrayArray = isArrayOf({ item: isArrayOf({ item: isString }) });
      expect(checkerType(isStringArrayArray)).toBe('string[][]');
    });

    it('should generate correct type for isSomeOf', () => {
      const isStringOrNumber = isSomeOf(isString, isNumber);
      expect(checkerType(isStringOrNumber)).toBe('(string | number)');
      const isComplex = isSomeOf(isString, isArrayOf({ item: isNumber }));
      expect(checkerType(isComplex)).toBe('(string | number[])');
    });

    it('should generate correct type for isInstanceOf', () => {
      class MyClass {}
      class AnotherClass {}
      const isMyClass = isInstanceOf(MyClass);
      expect(checkerType(isMyClass)).toBe('[class MyClass]');
      const isOneOfTwo = isInstanceOf(MyClass, AnotherClass);
      expect(checkerType(isOneOfTwo)).toBe('[class MyClass | class AnotherClass]');
    });

    it('should handle anonymous classes in isInstanceOf', () => {
      const isAnon = isInstanceOf(class {});
      expect(checkerType(isAnon)).toBe('[class]');
    });
  });

  describe('Custom Checker Creation', () => {
    it('should create a checker with no type tag', () => {
      const isPositive = (o: unknown): o is number => typeof o === 'number' && o > 0;
      expect(isPositive(1)).toBe(true);
      expect(isPositive(-1)).toBe(false);
      expect(checkerType(isPositive)).toBe('[unknown]');
    });

    it('should create a checker with a fixed string type', () => {
      const isPositive = tagChecker(
        (o: unknown): o is number => typeof o === 'number' && o > 0,
        'positive-number'
      );
      expect(isPositive(1)).toBe(true);
      expect(isPositive(-1)).toBe(false);
      expect(checkerType(isPositive)).toBe('positive-number');
    });

    it('should create a checker with a cached getter for the type', () => {
      const typeGetter = jest.fn(() => 'positive-number');
      const isPositive = tagCheckerGetter(
        (o: unknown): o is number => typeof o === 'number' && o > 0,
        typeGetter
      );

      expect(checkerType(isPositive)).toBe('positive-number');
      expect(checkerType(isPositive)).toBe('positive-number'); // Access again
      expect(typeGetter).toHaveBeenCalledTimes(1); // Should only be called once
    });

    it('should create a checker with a non-cached getter for the type', () => {
      const typeGetter = jest.fn(() => 'positive-number');
      const isPositive = tagCheckerGetter(
        (o: unknown): o is number => typeof o === 'number' && o > 0,
        typeGetter,
        false // cache = false
      );

      expect(checkerType(isPositive)).toBe('positive-number');
      expect(checkerType(isPositive)).toBe('positive-number'); // Access again
      expect(typeGetter).toHaveBeenCalledTimes(2); // Should be called each time
    });
  });

  describe('Validator Error Messages', () => {
    it('should include the type in the error message when available', () => {
      const validateString = validator(isString);
      expect(() => validateString(123, s => s.length)).toThrow('check of type string failed, got 123');
      const validateString0 = validator0(isString);
      expect(() => validateString0(123)).toThrow('check of type string failed, got 123');
    });

    it('should not include the type in the error message when not available', () => {
      const isPositive = (o: unknown): o is number => typeof o === 'number' && o > 0;
      const validatePositive = validator(isPositive);
      expect(() => validatePositive(-1, n => n)).toThrow('check failed, got -1');
      const validatePositive0 = validator0(isPositive);
      expect(() => validatePositive0(-1)).toThrow('check failed, got -1');
    });

    it('should return transformed value on successful validation', () => {
      const validateString = validator(isString);
      expect(validateString('test', s => s.toUpperCase())).toBe('TEST');
    });

    it('should return value on successful validation for validator0', () => {
      const validateNumber = validator0(isNumber);
      expect(validateNumber(123)).toBe(123);
    });
  });
});
