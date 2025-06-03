import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MenuCreateWithoutItemsInput } from './menu-create-without-items.input';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@InputType()
export class MenuCreateOrConnectWithoutItemsInput {
  @Field(() => MenuWhereUniqueInput, { nullable: false })
  @Type(() => MenuWhereUniqueInput)
  where!: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;

  @Field(() => MenuCreateWithoutItemsInput, { nullable: false })
  @Type(() => MenuCreateWithoutItemsInput)
  create!: MenuCreateWithoutItemsInput;
}
