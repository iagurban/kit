import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLError, ValueNode } from 'graphql';
import { GraphQLBigInt } from 'graphql-scalars';

@Scalar('BigInt', () => BigInt)
export class BigIntScalar implements CustomScalar<string, bigint> {
  description = '64-bit signed integer';

  private scalar = GraphQLBigInt;

  parseValue(value: unknown): bigint {
    const parsed = this.scalar.parseValue(value);
    // The CustomScalar interface requires a bigint, so we ensure the type.
    return BigInt(parsed);
  }

  serialize(value: unknown): string {
    const serialized = this.scalar.serialize(value);
    // The CustomScalar interface requires a string, so we ensure the type.
    return String(serialized);
  }

  parseLiteral(ast: ValueNode): bigint {
    const result = this.scalar.parseLiteral(ast, undefined);

    if (result === null) {
      throw new GraphQLError(
        `BigInt cannot represent non-integer value: ${'value' in ast ? ast.value : '(invalid AST node)'}`
      );
    }
    // The CustomScalar interface requires a bigint, so we ensure the type.
    return BigInt(result);
  }
}
