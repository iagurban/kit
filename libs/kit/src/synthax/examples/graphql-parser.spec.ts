import { $t } from '../define';
import { defineGraphqlParser } from './graphql-parser';

describe('graphql-parser', () => {
  test('zfdgcgv', () => {
    const { root } = defineGraphqlParser();

    // console.dir(
    //   testParse(`query Abc{a1: field1 a2 : field2(a: $a1, b: 123, c: Enum){field21 field22}}`, root),
    //   {
    //     depth: null,
    //   }
    // );

    console.dir(
      $t.run(
        `
        
         # comment on Union
        union Union = T1
        
        union Union2 = T1 | T2
        
# comment on Type
        type T1 { # jfhfj
          id
        }
        
        interface I1 { id }
        
        type T2 implements I1 { id }
        
        fragment Frag on T1 { id }
    
       # comment on Query
        query Abc ( $a : [ ID ] ! ) {
         # sfd
         qwe @skip(if: $a) {id} as: wdsdef ...Frag ...on Task {b} a:a2 aaaa  :  a3 ( a : $a ) {id} }
        
        query QQ ($a : ID!, $b: ID, $c: [ ID]) { a: aw( a: $a, b : $b  ) {id} }`,
        root
      ),
      {
        depth: null,
      }
    );
  });
});
