import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MenuCreateWithoutTagsInput } from './menu-create-without-tags.input';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@InputType()
export class MenuCreateOrConnectWithoutTagsInput {
  @Field(() => MenuWhereUniqueInput, { nullable: false })
  @Type(() => MenuWhereUniqueInput)
  where!: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;

  @Field(() => MenuCreateWithoutTagsInput, { nullable: false })
  @Type(() => MenuCreateWithoutTagsInput)
  create!: MenuCreateWithoutTagsInput;
}
