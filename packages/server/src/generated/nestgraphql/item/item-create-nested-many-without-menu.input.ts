import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemCreateManyMenuInputEnvelope } from './item-create-many-menu-input-envelope.input';
import { ItemCreateOrConnectWithoutMenuInput } from './item-create-or-connect-without-menu.input';
import { ItemCreateWithoutMenuInput } from './item-create-without-menu.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemCreateNestedManyWithoutMenuInput {
  @Field(() => [ItemCreateWithoutMenuInput], { nullable: true })
  @Type(() => ItemCreateWithoutMenuInput)
  create?: Array<ItemCreateWithoutMenuInput>;

  @Field(() => [ItemCreateOrConnectWithoutMenuInput], { nullable: true })
  @Type(() => ItemCreateOrConnectWithoutMenuInput)
  connectOrCreate?: Array<ItemCreateOrConnectWithoutMenuInput>;

  @Field(() => ItemCreateManyMenuInputEnvelope, { nullable: true })
  @Type(() => ItemCreateManyMenuInputEnvelope)
  createMany?: ItemCreateManyMenuInputEnvelope;

  @Field(() => [ItemWhereUniqueInput], { nullable: true })
  @Type(() => ItemWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>>;
}
