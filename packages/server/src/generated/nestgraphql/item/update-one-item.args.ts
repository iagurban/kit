import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemUpdateInput } from './item-update.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@ArgsType()
export class UpdateOneItemArgs {
  @Field(() => ItemUpdateInput, { nullable: false })
  @Type(() => ItemUpdateInput)
  data!: ItemUpdateInput;

  @Field(() => ItemWhereUniqueInput, { nullable: false })
  @Type(() => ItemWhereUniqueInput)
  where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;
}
