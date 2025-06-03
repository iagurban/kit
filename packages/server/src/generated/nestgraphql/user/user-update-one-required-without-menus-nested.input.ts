import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateOrConnectWithoutMenusInput } from './user-create-or-connect-without-menus.input';
import { UserCreateWithoutMenusInput } from './user-create-without-menus.input';
import { UserUpdateToOneWithWhereWithoutMenusInput } from './user-update-to-one-with-where-without-menus.input';
import { UserUpsertWithoutMenusInput } from './user-upsert-without-menus.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateOneRequiredWithoutMenusNestedInput {
  @Field(() => UserCreateWithoutMenusInput, { nullable: true })
  @Type(() => UserCreateWithoutMenusInput)
  create?: UserCreateWithoutMenusInput;

  @Field(() => UserCreateOrConnectWithoutMenusInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutMenusInput)
  connectOrCreate?: UserCreateOrConnectWithoutMenusInput;

  @Field(() => UserUpsertWithoutMenusInput, { nullable: true })
  @Type(() => UserUpsertWithoutMenusInput)
  upsert?: UserUpsertWithoutMenusInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

  @Field(() => UserUpdateToOneWithWhereWithoutMenusInput, { nullable: true })
  @Type(() => UserUpdateToOneWithWhereWithoutMenusInput)
  update?: UserUpdateToOneWithWhereWithoutMenusInput;
}
