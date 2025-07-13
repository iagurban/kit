import { once } from '../../core/once';
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

  get fixedEscapesEnd() {
    return once(
      this,
      `fixedEscapesEnd`,
      true,
      $t.or([
        ...(
          [
            [`n`, `\n`],
            [`t`, `\t`],
            [`r`, `\r`],
            [`b`, `\b`],
            [`f`, `\f`],
            [`\\`, `\\`],
          ] as const
        ).map(([a, b]) => $t.cps(a)(() => b)),
        $t.seq(
          $t.cps(`u`).mute(),
          $t.repeat(
            $t.cp(b => b.digits().range(`af`).range(`AF`)).mute(),
            1
          )((ast, info) => String.fromCodePoint(+$u.nodeText(info)))
        ),
        $t.failure(`unknown escape sequence`),
      ])
    );
  },

  escapeSeq(quote: string) {
    return $t.seq(
      $t.cps(`\\`).mute(),
      $t.or([$t.cps(quote).mute(), this.fixedEscapesEnd])
    )(([, value]) => value);
  },

  stringLiteral<R extends AnyAst>(quote: string, fn: (value: string) => R) {
    return $t.seq(
      $t.cps(quote).mute(),
      $t.repeat(
        $t.or([this.escapeSeq(quote), $t.notCps(quote).mute()]).mute(),
        0
      )((none, info) => fn($u.nodeText(info))),
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

  const doubleQuoteString = jsonPresets.stringLiteral(`"`, s => s);

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
