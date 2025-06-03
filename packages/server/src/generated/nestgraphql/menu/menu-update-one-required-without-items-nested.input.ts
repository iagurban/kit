import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MenuCreateOrConnectWithoutItemsInput } from './menu-create-or-connect-without-items.input';
import { MenuCreateWithoutItemsInput } from './menu-create-without-items.input';
import { MenuUpdateToOneWithWhereWithoutItemsInput } from './menu-update-to-one-with-where-without-items.input';
import { MenuUpsertWithoutItemsInput } from './menu-upsert-without-items.input';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@InputType()
export class MenuUpdateOneRequiredWithoutItemsNestedInput {
  @Field(() => MenuCreateWithoutItemsInput, { nullable: true })
  @Type(() => MenuCreateWithoutItemsInput)
  create?: MenuCreateWithoutItemsInput;

  @Field(() => MenuCreateOrConnectWithoutItemsInput, { nullable: true })
  @Type(() => MenuCreateOrConnectWithoutItemsInput)
  connectOrCreate?: MenuCreateOrConnectWithoutItemsInput;

  @Field(() => MenuUpsertWithoutItemsInput, { nullable: true })
  @Type(() => MenuUpsertWithoutItemsInput)
  upsert?: MenuUpsertWithoutItemsInput;

  @Field(() => MenuWhereUniqueInput, { nullable: true })
  @Type(() => MenuWhereUniqueInput)
  connect?: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;

  @Field(() => MenuUpdateToOneWithWhereWithoutItemsInput, { nullable: true })
  @Type(() => MenuUpdateToOneWithWhereWithoutItemsInput)
  update?: MenuUpdateToOneWithWhereWithoutItemsInput;
}
