import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemCreateManyImageInputEnvelope } from './item-create-many-image-input-envelope.input';
import { ItemCreateOrConnectWithoutImageInput } from './item-create-or-connect-without-image.input';
import { ItemCreateWithoutImageInput } from './item-create-without-image.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemUncheckedCreateNestedManyWithoutImageInput {
  @Field(() => [ItemCreateWithoutImageInput], { nullable: true })
  @Type(() => ItemCreateWithoutImageInput)
  create?: Array<ItemCreateWithoutImageInput>;

  @Field(() => [ItemCreateOrConnectWithoutImageInput], { nullable: true })
  @Type(() => ItemCreateOrConnectWithoutImageInput)
  connectOrCreate?: Array<ItemCreateOrConnectWithoutImageInput>;

  @Field(() => ItemCreateManyImageInputEnvelope, { nullable: true })
  @Type(() => ItemCreateManyImageInputEnvelope)
  createMany?: ItemCreateManyImageInputEnvelope;

  @Field(() => [ItemWhereUniqueInput], { nullable: true })
  @Type(() => ItemWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>>;
}
