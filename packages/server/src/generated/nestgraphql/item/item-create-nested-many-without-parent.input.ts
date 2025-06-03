import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemCreateManyParentInputEnvelope } from './item-create-many-parent-input-envelope.input';
import { ItemCreateOrConnectWithoutParentInput } from './item-create-or-connect-without-parent.input';
import { ItemCreateWithoutParentInput } from './item-create-without-parent.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemCreateNestedManyWithoutParentInput {
  @Field(() => [ItemCreateWithoutParentInput], { nullable: true })
  @Type(() => ItemCreateWithoutParentInput)
  create?: Array<ItemCreateWithoutParentInput>;

  @Field(() => [ItemCreateOrConnectWithoutParentInput], { nullable: true })
  @Type(() => ItemCreateOrConnectWithoutParentInput)
  connectOrCreate?: Array<ItemCreateOrConnectWithoutParentInput>;

  @Field(() => ItemCreateManyParentInputEnvelope, { nullable: true })
  @Type(() => ItemCreateManyParentInputEnvelope)
  createMany?: ItemCreateManyParentInputEnvelope;

  @Field(() => [ItemWhereUniqueInput], { nullable: true })
  @Type(() => ItemWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>>;
}
