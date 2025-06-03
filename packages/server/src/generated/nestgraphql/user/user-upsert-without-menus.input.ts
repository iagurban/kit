import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutMenusInput } from './user-create-without-menus.input';
import { UserUpdateWithoutMenusInput } from './user-update-without-menus.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutMenusInput {
  @Field(() => UserUpdateWithoutMenusInput, { nullable: false })
  @Type(() => UserUpdateWithoutMenusInput)
  update!: UserUpdateWithoutMenusInput;

  @Field(() => UserCreateWithoutMenusInput, { nullable: false })
  @Type(() => UserCreateWithoutMenusInput)
  create!: UserCreateWithoutMenusInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
