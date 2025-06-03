import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemCreateWithoutMenuInput } from './item-create-without-menu.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemCreateOrConnectWithoutMenuInput {
  @Field(() => ItemWhereUniqueInput, { nullable: false })
  @Type(() => ItemWhereUniqueInput)
  where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

  @Field(() => ItemCreateWithoutMenuInput, { nullable: false })
  @Type(() => ItemCreateWithoutMenuInput)
  create!: ItemCreateWithoutMenuInput;
}
