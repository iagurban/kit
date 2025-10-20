import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLError, Kind, ValueNode } from 'graphql';

@Scalar('BigInt', () => BigInt)
export class BigIntScalar implements CustomScalar<string, bigint> {
  description = '64-bit signed integer';

  private static processValue(value: unknown): bigint {
    if (typeof value === 'bigint') {
      return value;
    }
    try {
      return BigInt(value as string | number);
    } catch {
      throw new GraphQLError(`Invalid value for BigInt: ${value}`);
    }
  }

  parseValue(value: unknown): bigint {
    return BigIntScalar.processValue(value);
  }

  serialize(value: unknown): string {
    return BigIntScalar.processValue(value).toString();
  }

  parseLiteral(ast: ValueNode): bigint {
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
      return BigIntScalar.processValue(ast.value);
    }
    throw new GraphQLError(`Can not convert literal of kind ${ast.kind} to a BigInt.`);
  }
}
