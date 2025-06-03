import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MenuOrderByWithRelationInput } from './menu-order-by-with-relation.input';
import { MenuScalarFieldEnum } from './menu-scalar-field.enum';
import { MenuWhereInput } from './menu-where.input';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@ArgsType()
export class FindFirstMenuOrThrowArgs {
  @Field(() => MenuWhereInput, { nullable: true })
  @Type(() => MenuWhereInput)
  where?: MenuWhereInput;

  @Field(() => [MenuOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<MenuOrderByWithRelationInput>;

  @Field(() => MenuWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [MenuScalarFieldEnum], { nullable: true })
  distinct?: Array<`${MenuScalarFieldEnum}`>;
}
