import { isTruthy } from '../../../core/checks';
import { $t, $u, InferTokenizer, rawSpan } from '../define';
import { Tokenizer } from '../tokenizer-def';
import { CodePointsBuilder } from '../util/code-points-builder';
import { defineJsonParser, jsonPresets } from './json-parser';

type TypeDeclType = { kind: `type`; name: string; nullable: boolean };
type TypeDeclList = { kind: `list`; of: TypeDecl; nullable: boolean };
type TypeDecl = TypeDeclType | TypeDeclList;

export const defineGraphqlParser = () => {
  const { value: jsonValue } = defineJsonParser();

  const lettersRangeB = (b: CodePointsBuilder) => b.range(`az`).range(`AZ`);
  const digitsRangeB = (b: CodePointsBuilder) => b.range(`09`);
  const specCharsB = (b: CodePointsBuilder) => b.any(`_$`);

  const { ws } = jsonPresets;

  const justSpaces = $t.repeat($t.cps(` \t`), 1).mute();

  const comment = $t.seq(
    $t.maybe(justSpaces).mute(),
    $t.cps(`#`).mute(),
    $t.maybe(justSpaces),
    $t
      .repeat($t.notCps('\n'), 0)
      .mute()
      .pipe((none, info) => ({ kind: `comment`, text: $u.nodeText(info) }) as const)
  )(([, , , comment]) => comment);

  const nlWithComment = $t.seq(
    $t.maybe(justSpaces).mute(),
    $t.cps(`\n`).mute(),
    justSpaces,
    comment
  )(([, , , comment]) => comment);

  const mbws = $t.repeat(
    $t.or([nlWithComment, comment, justSpaces, $t.cps('\n').mute()]),
    0
  )(r =>
    r
      .map(c => c?.text)
      .filter(isTruthy)
      .join('\n')
  )(r => {
    // console.log(`ws`, r);
    return r;
  });

  const tailVarLetter = $t.cp(b => specCharsB(digitsRangeB(lettersRangeB(b))))($u.mute);
  const firstVarLetter = $t.cp(b => specCharsB(lettersRangeB(b)))($u.mute);

  const comma = $t.cps(',')($u.mute);

  const atomName = $t.seq(
    firstVarLetter,
    $t.repeat(tailVarLetter, 0)($u.mute)
  )(rawSpan(name => ({ kind: `atom`, name }) as const));

  const varName = $t.seq(
    $t.cps(`$`).mute(),
    $t.repeat(tailVarLetter, 1)($u.mute)
  )(rawSpan(name => ({ kind: `var`, name }) as const));

  const arg = $t.seq(
    atomName,
    mbws,
    $t.cps(`:`).mute(),
    mbws,
    $t.or([varName, atomName, jsonValue])
  )(([dst, , , , src]) => ({ kind: `arg`, dst: dst.name, src: src }) as const);

  const args = $t.seq(
    $t.cps(`(`).mute(),
    mbws,
    arg,
    $t.maybe(
      $t.repeat(
        $t.seq(comma, mbws, arg, mbws)(([, , arg]) => arg),
        0
      )
    ),
    mbws,
    $t.cps(`)`).mute()
  )(([, , first, rest]) => [first, ...(rest.item || [])]);

  type SelectionSet = (
    | { kind: `select`; name: string; alias?: string; selection?: SelectionSet }
    | { kind: `inlineFragment`; on: string; selection?: SelectionSet }
    | { kind: `spread`; name: string }
  )[];

  const alias = $t.seq(atomName, mbws, $t.cps(`:`))(([name]) => name);

  const directive = $t.seq(
    $t.cps(`@`).mute(),
    mbws,
    atomName,
    mbws,
    args
  )(([, , name, , args]) => ({ name: name.name, args }));

  const selectionLine: Tokenizer<{
    kind: `select`;
    name: string;
    alias?: string;
    args?: InferTokenizer<typeof args>;
    selection?: SelectionSet;
  }> = $t.seq(
    $t.maybe(alias),
    mbws,
    atomName,
    mbws,
    $t.maybe(() => args),
    mbws,
    $t.maybe($t.seq(directive, mbws)(([d]) => d)),
    $t.maybe(() => selectionSet)
  )(
    ([alias, , name, , args, , directive, selection]) =>
      ({
        kind: `select`,
        name: name.name,
        alias: alias.item?.name,
        args: args.item,
        directive: directive.item,
        selection: selection.item,
      }) as const
  );

  const spread = $t.seq(
    $t.keywords([`...`]).mute(),
    mbws,
    atomName
  )(([, , name]) => ({ kind: `spread`, name: name.name }) as const);

  const inlineFragment = $t.seq(
    $t.keywords([`...`]).mute(),
    mbws,
    $t.keywords([`on`]).mute(),
    ws,
    atomName,
    mbws,
    () => selectionSet
  )(
    ([, , , , name, , selection]) =>
      ({
        kind: `inlineFragment`,
        on: name.name,
        selection: selection,
      }) as const
  );

  const selectionSet: Tokenizer<SelectionSet> = $t.seq(
    $t.cps(`{`).mute(),
    mbws,
    $t.repeat(
      $t.seq($t.or([selectionLine, inlineFragment, spread]), mbws)(([r]) => r),
      0
    ),
    $t.cps(`}`).mute()
  )(([, , fields]) => fields);

  const typeDeclType: Tokenizer<TypeDeclType> = $t.seq(
    atomName,
    $t.maybe(
      $t.seq(
        mbws,
        $t.cps(`!`)(() => true)
      )(([, r]) => r)
    )
  )(([name, required]) => ({ kind: `type`, name: name.name, nullable: !required.item }));

  const typeDeclList: Tokenizer<TypeDeclList> = $t.seq(
    $t.cps(`[`).mute(),
    mbws,
    () => typeDecl,
    mbws,
    $t.cps(`]`).mute(),
    mbws,
    $t.maybe($t.cps(`!`)(() => true))
  )(([, , of, , , , required]) => ({ kind: `list`, of: of, nullable: !required.item }));

  const typeDecl: Tokenizer<TypeDecl> = $t.or([typeDeclList, typeDeclType]);

  const firstBlockArg = $t.seq(
    varName,
    mbws,
    $t.cps(`:`).mute(),
    mbws,
    typeDecl
  )(([variable, , , , type]) => ({ variable: variable.name, type }));

  const blockArgs = $t.seq(
    $t.cps(`(`).mute(),
    mbws,
    firstBlockArg,
    mbws,
    $t.repeat(
      $t.seq(comma, mbws, firstBlockArg, mbws)(([, , arg]) => arg),
      0
    ),
    $t.cps(`)`).mute()
  )(([, , first, , rest]) => [first, ...rest]);

  const block = $t.seq(
    $t.keywords([`query`, `mutation`, `subscription`]),
    ws,
    atomName,
    mbws,
    $t.maybe($t.seq(blockArgs, mbws)(([a]) => a)),
    $t.maybe(selectionSet)
  )(
    ([type, , name, , args, selection]) =>
      ({
        type: type.match as `query` | `mutation` | `subscription`,
        name: name.name,
        args: args.item,
        selection: selection.item,
      }) as const
  );

  const type = $t.seq(
    $t.keywords([`type`, `interface`]),
    ws,
    atomName,
    mbws,
    $t.maybe($t.seq($t.keywords([`implements`]).mute(), ws, atomName, mbws)(([, , name]) => name.name)),
    $t.maybe(selectionSet)
  )(
    ([type, , name, , implementing, selection]) =>
      ({
        type: type.match as `type` | `interface`,
        name: name.name,
        implementing: implementing.item,
        selection: selection.item,
      }) as const
  );

  const fragment = $t.seq(
    $t.keywords([`fragment`]).mute(),
    ws,
    atomName,
    ws,
    $t.keywords([`on`]).mute(),
    ws,
    atomName,
    mbws,
    selectionSet
  )(
    ([, , name, , , , on, , selection]) =>
      ({
        type: `fragment`,
        name: name.name,
        on: on.name,
        selection,
      }) as const
  );

  const union = $t.seq(
    $t.keywords([`union`]).mute(),
    ws,
    atomName,
    mbws,
    $t.cps(`=`).mute(),
    mbws,
    typeDecl,
    $t.repeat(
      $t.seq(mbws, $t.cps(`|`).mute(), mbws, typeDecl)(([, , , type]) => type),
      0
    )
  )(
    ([, , name, , , , first, rest], info) =>
      ({
        kind: `union`,
        name: name.name,
        oneOf: [first, ...(rest || [])],
      }) as const
  );

  const root = $t.repeat(
    $t.seq(mbws, $t.or([block, fragment, type, union]), mbws)(([comment, q]) => ({ ...q, comment })),
    0
  );

  return { root, block, fragment };
};
