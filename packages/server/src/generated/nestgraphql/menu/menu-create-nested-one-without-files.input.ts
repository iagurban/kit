import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MenuCreateOrConnectWithoutFilesInput } from './menu-create-or-connect-without-files.input';
import { MenuCreateWithoutFilesInput } from './menu-create-without-files.input';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@InputType()
export class MenuCreateNestedOneWithoutFilesInput {
  @Field(() => MenuCreateWithoutFilesInput, { nullable: true })
  @Type(() => MenuCreateWithoutFilesInput)
  create?: MenuCreateWithoutFilesInput;

  @Field(() => MenuCreateOrConnectWithoutFilesInput, { nullable: true })
  @Type(() => MenuCreateOrConnectWithoutFilesInput)
  connectOrCreate?: MenuCreateOrConnectWithoutFilesInput;

  @Field(() => MenuWhereUniqueInput, { nullable: true })
  @Type(() => MenuWhereUniqueInput)
  connect?: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;
}
