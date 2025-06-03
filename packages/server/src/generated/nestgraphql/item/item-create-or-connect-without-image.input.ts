import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemCreateWithoutImageInput } from './item-create-without-image.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemCreateOrConnectWithoutImageInput {
  @Field(() => ItemWhereUniqueInput, { nullable: false })
  @Type(() => ItemWhereUniqueInput)
  where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

  @Field(() => ItemCreateWithoutImageInput, { nullable: false })
  @Type(() => ItemCreateWithoutImageInput)
  create!: ItemCreateWithoutImageInput;
}
