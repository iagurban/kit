import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MenuCreateWithoutFilesInput } from './menu-create-without-files.input';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@InputType()
export class MenuCreateOrConnectWithoutFilesInput {
  @Field(() => MenuWhereUniqueInput, { nullable: false })
  @Type(() => MenuWhereUniqueInput)
  where!: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;

  @Field(() => MenuCreateWithoutFilesInput, { nullable: false })
  @Type(() => MenuCreateWithoutFilesInput)
  create!: MenuCreateWithoutFilesInput;
}
