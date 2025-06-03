import { Field, ObjectType } from '@nestjs/graphql';

import { Prisma } from '../../db-client';
import Decimal = Prisma.Decimal;
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';

@ObjectType()
export class ItemAvgAggregate {
  @Field(() => GraphQLDecimal, { nullable: true })
  price?: Decimal;
}
