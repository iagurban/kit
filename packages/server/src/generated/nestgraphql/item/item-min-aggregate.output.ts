import { Field, ObjectType } from '@nestjs/graphql';

import { Prisma } from '../../db-client';
import Decimal = Prisma.Decimal;
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';

@ObjectType()
export class ItemMinAggregate {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => String, { nullable: true })
  orderKey?: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => GraphQLDecimal, { nullable: true })
  price?: Decimal;

  @Field(() => Boolean, { nullable: true })
  archived?: boolean;

  @Field(() => String, { nullable: true })
  imageId?: string;

  @Field(() => String, { nullable: true })
  menuId?: string;

  @Field(() => String, { nullable: true })
  parentId?: string;
}
