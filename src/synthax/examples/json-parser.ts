import { once } from '../../core/once';
import { NumberBase } from '../../numbers/number-base';
import { fromEntries } from '../../utils/object-utils';
import { $t, $u } from '../define';
import { AnyAst, Tokenizer, TokenizerResult } from '../tokenizer-def';

const tcp = `t`.codePointAt(0)!;

export const jsonPresets = {
  get ws1() {
    return once(this, `ws1`, true, $t.cps(` \t\n`)($u.mute));
  },
  get mbws() {
    return once(this, `mbws`, true, $t.repeat(this.ws1, 0)($u.mute));
  },
  get ws() {
    return once(this, `ws`, true, $t.repeat(this.ws1, 1)($u.mute));
  },

  stringLiteral(quote: string) {
    const fixedEscapeContentRules = (
      [
        [`n`, `\n`],
        [`t`, `\t`],
        [`r`, `\r`],
        [`b`, `\b`],
        [`f`, `\f`],
        [quote, quote],
        [`\\`, `\\`],
      ] as const
    )
      .map(([a, b]) => [a, b] as const)
      .map(([a, b]) => $t.cps(a)(() => b));

    const numericEscapeContent = $t.seq(
      $t.cps(`u`).mute(),
      $t.repeat(
        $t.cp(b => b.digits().range(`af`).range(`AF`)).mute(),
        4,
        4
      )((none, info) => $u.nodeText(info).toLowerCase())
    )(([, cp]) => String.fromCodePoint(Number(NumberBase.b16.to10(cp))));

    const escape = $t.seq(
      $t.cps(`\\`).mute(),
      $t.or([...fixedEscapeContentRules, numericEscapeContent, $t.failure(`unknown escape sequence`)])
    )(([, value]) => value);

    return $t.seq(
      $t.cps(quote).mute(),
      $t.repeat(
        $t.or([
          escape,
          $t.repeat(
            $t.notCps(`\\"`)(({ cp }) => cp),
            1
          )(r => String.fromCodePoint(...r)),
        ]),
        0
      ),
      $t.cps(quote).mute()
    )(([, s]) => s);
  },

  get positiveNumberMatcher() {
    const digit = $t.cp(b => b.digits())($u.mute);

    return once(
      this,
      `positiveNumberMatcher`,
      true,
      $t
        .seq(
          // don't check for minus, it will be unary or binary operator
          $t.repeat(digit, 1).mute(),
          $t.maybe($t.seq($t.cps(`.`).mute(), $t.repeat(digit, 1).mute()).mute()).mute()
        )
        .mute()
    );
  },

  get numberMatcher() {
    return once(
      this,
      `numberMatcher`,
      true,
      $t.seq($t.maybe($t.cps(`-`).mute()).mute(), this.positiveNumberMatcher).mute()
    );
  },

  numberLiteral<R extends AnyAst>(fn: (value: number, info: TokenizerResult<unknown>) => R) {
    return this.numberMatcher((none, info) => fn(parseFloat($u.nodeText(info)), info));
  },

  positiveNumberLiteral<R extends AnyAst>(fn: (value: number, info: TokenizerResult<unknown>) => R) {
    return this.positiveNumberMatcher.pipe((none, info) => fn(parseFloat($u.nodeText(info)), info));
  },

  get booleanMatcher() {
    return once(this, `booleanMatcher`, true, $t.keywords([`true`, `false`]));
  },

  booleanLiteral<R extends AnyAst>(fn: (value: boolean, info: TokenizerResult<unknown>) => R) {
    return this.booleanMatcher.pipe((result, info) => fn(result.match.codePointAt(0) === tcp, info));
  },

  get nullMatcher() {
    return once(
      this,
      `nullMatcher`,
      true,
      $t.keywords([`null`])(() => null)
    );
  },

  nullLiteral<R extends AnyAst>(fn: (value: null, info: TokenizerResult<unknown>) => R) {
    return this.nullMatcher.pipe((none, info) => fn(null, info));
  },
} as const;

type ValueType = ObjectType | ArrayType | string | number | boolean | null;
type ArrayType = ValueType[];
type ObjectType = { [key: string]: ValueType };

export const defineJsonParser = () => {
  const { mbws } = jsonPresets;

  const doubleQuoteString = jsonPresets.stringLiteral(`"`)(r => r.join(''));

  const value = $t.or([
    () => object,
    () => array,
    doubleQuoteString,
    jsonPresets.numberLiteral(r => r),
    jsonPresets.booleanLiteral(r => r),
    jsonPresets.nullLiteral(r => r),
  ]);

  const objectPair = $t.seq(
    doubleQuoteString,
    mbws,
    $t.cps(`:`).mute(),
    mbws,
    value
  )(([key, , , , value]) => [key, value] as const);

  const object: Tokenizer<ObjectType> = $t.seq(
    $t.cps(`{`).mute(),
    mbws,
    objectPair,
    mbws,
    $t.repeat(
      $t.seq($t.cps(`,`).mute(), mbws, objectPair, mbws)(([, , pair]) => ({ pair })),
      0
    ),
    $t.cps(`}`).mute()
  )(([, , first, , rest]) => fromEntries([first, ...rest.map(r => r.pair)]));

  const array: Tokenizer<ArrayType> = $t.seq(
    $t.cps(`[`).mute(),
    mbws,
    value,
    mbws,
    $t.repeat(
      $t.seq($t.cps(`,`)($u.mute), mbws, value, mbws)(([, , pair]) => ({ pair })),
      0
    ),
    $t.cps(`]`).mute()
  )(([, , first, , rest]) => [first, ...rest.map(r => r.pair)]);

  const root = $t.seq(mbws, value)(([, result]) => result);

  return { root, value, object, array };
};
