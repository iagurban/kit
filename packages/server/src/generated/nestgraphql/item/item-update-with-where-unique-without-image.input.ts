import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemUpdateWithoutImageInput } from './item-update-without-image.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemUpdateWithWhereUniqueWithoutImageInput {
  @Field(() => ItemWhereUniqueInput, { nullable: false })
  @Type(() => ItemWhereUniqueInput)
  where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

  @Field(() => ItemUpdateWithoutImageInput, { nullable: false })
  @Type(() => ItemUpdateWithoutImageInput)
  data!: ItemUpdateWithoutImageInput;
}
