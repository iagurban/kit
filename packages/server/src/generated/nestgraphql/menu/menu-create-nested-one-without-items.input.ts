import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MenuCreateOrConnectWithoutItemsInput } from './menu-create-or-connect-without-items.input';
import { MenuCreateWithoutItemsInput } from './menu-create-without-items.input';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@InputType()
export class MenuCreateNestedOneWithoutItemsInput {
  @Field(() => MenuCreateWithoutItemsInput, { nullable: true })
  @Type(() => MenuCreateWithoutItemsInput)
  create?: MenuCreateWithoutItemsInput;

  @Field(() => MenuCreateOrConnectWithoutItemsInput, { nullable: true })
  @Type(() => MenuCreateOrConnectWithoutItemsInput)
  connectOrCreate?: MenuCreateOrConnectWithoutItemsInput;

  @Field(() => MenuWhereUniqueInput, { nullable: true })
  @Type(() => MenuWhereUniqueInput)
  connect?: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;
}
