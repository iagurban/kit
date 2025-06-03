import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemCreateInput } from './item-create.input';
import { ItemUpdateInput } from './item-update.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@ArgsType()
export class UpsertOneItemArgs {
  @Field(() => ItemWhereUniqueInput, { nullable: false })
  @Type(() => ItemWhereUniqueInput)
  where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

  @Field(() => ItemCreateInput, { nullable: false })
  @Type(() => ItemCreateInput)
  create!: ItemCreateInput;

  @Field(() => ItemUpdateInput, { nullable: false })
  @Type(() => ItemUpdateInput)
  update!: ItemUpdateInput;
}
