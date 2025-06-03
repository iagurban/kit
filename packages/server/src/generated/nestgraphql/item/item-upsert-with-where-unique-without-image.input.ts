import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemCreateWithoutImageInput } from './item-create-without-image.input';
import { ItemUpdateWithoutImageInput } from './item-update-without-image.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemUpsertWithWhereUniqueWithoutImageInput {
  @Field(() => ItemWhereUniqueInput, { nullable: false })
  @Type(() => ItemWhereUniqueInput)
  where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

  @Field(() => ItemUpdateWithoutImageInput, { nullable: false })
  @Type(() => ItemUpdateWithoutImageInput)
  update!: ItemUpdateWithoutImageInput;

  @Field(() => ItemCreateWithoutImageInput, { nullable: false })
  @Type(() => ItemCreateWithoutImageInput)
  create!: ItemCreateWithoutImageInput;
}
