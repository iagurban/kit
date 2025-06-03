import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MenuCreateWithoutOwnerInput } from './menu-create-without-owner.input';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@InputType()
export class MenuCreateOrConnectWithoutOwnerInput {
  @Field(() => MenuWhereUniqueInput, { nullable: false })
  @Type(() => MenuWhereUniqueInput)
  where!: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;

  @Field(() => MenuCreateWithoutOwnerInput, { nullable: false })
  @Type(() => MenuCreateWithoutOwnerInput)
  create!: MenuCreateWithoutOwnerInput;
}
