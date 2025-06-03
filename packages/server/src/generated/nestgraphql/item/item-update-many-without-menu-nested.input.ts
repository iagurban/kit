import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemCreateManyMenuInputEnvelope } from './item-create-many-menu-input-envelope.input';
import { ItemCreateOrConnectWithoutMenuInput } from './item-create-or-connect-without-menu.input';
import { ItemCreateWithoutMenuInput } from './item-create-without-menu.input';
import { ItemScalarWhereInput } from './item-scalar-where.input';
import { ItemUpdateManyWithWhereWithoutMenuInput } from './item-update-many-with-where-without-menu.input';
import { ItemUpdateWithWhereUniqueWithoutMenuInput } from './item-update-with-where-unique-without-menu.input';
import { ItemUpsertWithWhereUniqueWithoutMenuInput } from './item-upsert-with-where-unique-without-menu.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemUpdateManyWithoutMenuNestedInput {
  @Field(() => [ItemCreateWithoutMenuInput], { nullable: true })
  @Type(() => ItemCreateWithoutMenuInput)
  create?: Array<ItemCreateWithoutMenuInput>;

  @Field(() => [ItemCreateOrConnectWithoutMenuInput], { nullable: true })
  @Type(() => ItemCreateOrConnectWithoutMenuInput)
  connectOrCreate?: Array<ItemCreateOrConnectWithoutMenuInput>;

  @Field(() => [ItemUpsertWithWhereUniqueWithoutMenuInput], { nullable: true })
  @Type(() => ItemUpsertWithWhereUniqueWithoutMenuInput)
  upsert?: Array<ItemUpsertWithWhereUniqueWithoutMenuInput>;

  @Field(() => ItemCreateManyMenuInputEnvelope, { nullable: true })
  @Type(() => ItemCreateManyMenuInputEnvelope)
  createMany?: ItemCreateManyMenuInputEnvelope;

  @Field(() => [ItemWhereUniqueInput], { nullable: true })
  @Type(() => ItemWhereUniqueInput)
  set?: Array<Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>>;

  @Field(() => [ItemWhereUniqueInput], { nullable: true })
  @Type(() => ItemWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>>;

  @Field(() => [ItemWhereUniqueInput], { nullable: true })
  @Type(() => ItemWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>>;

  @Field(() => [ItemWhereUniqueInput], { nullable: true })
  @Type(() => ItemWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>>;

  @Field(() => [ItemUpdateWithWhereUniqueWithoutMenuInput], { nullable: true })
  @Type(() => ItemUpdateWithWhereUniqueWithoutMenuInput)
  update?: Array<ItemUpdateWithWhereUniqueWithoutMenuInput>;

  @Field(() => [ItemUpdateManyWithWhereWithoutMenuInput], { nullable: true })
  @Type(() => ItemUpdateManyWithWhereWithoutMenuInput)
  updateMany?: Array<ItemUpdateManyWithWhereWithoutMenuInput>;

  @Field(() => [ItemScalarWhereInput], { nullable: true })
  @Type(() => ItemScalarWhereInput)
  deleteMany?: Array<ItemScalarWhereInput>;
}
