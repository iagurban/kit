import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MenuUpdateWithoutOwnerInput } from './menu-update-without-owner.input';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@InputType()
export class MenuUpdateWithWhereUniqueWithoutOwnerInput {
  @Field(() => MenuWhereUniqueInput, { nullable: false })
  @Type(() => MenuWhereUniqueInput)
  where!: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;

  @Field(() => MenuUpdateWithoutOwnerInput, { nullable: false })
  @Type(() => MenuUpdateWithoutOwnerInput)
  data!: MenuUpdateWithoutOwnerInput;
}
