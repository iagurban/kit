import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MenuCreateWithoutOwnerInput } from './menu-create-without-owner.input';
import { MenuUpdateWithoutOwnerInput } from './menu-update-without-owner.input';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@InputType()
export class MenuUpsertWithWhereUniqueWithoutOwnerInput {
  @Field(() => MenuWhereUniqueInput, { nullable: false })
  @Type(() => MenuWhereUniqueInput)
  where!: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;

  @Field(() => MenuUpdateWithoutOwnerInput, { nullable: false })
  @Type(() => MenuUpdateWithoutOwnerInput)
  update!: MenuUpdateWithoutOwnerInput;

  @Field(() => MenuCreateWithoutOwnerInput, { nullable: false })
  @Type(() => MenuCreateWithoutOwnerInput)
  create!: MenuCreateWithoutOwnerInput;
}
