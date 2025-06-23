import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutOwnProjectInput } from './user-create-without-own-project.input';
import { UserUpdateWithoutOwnProjectInput } from './user-update-without-own-project.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutOwnProjectInput {
  @Field(() => UserUpdateWithoutOwnProjectInput, { nullable: false })
  @Type(() => UserUpdateWithoutOwnProjectInput)
  update!: UserUpdateWithoutOwnProjectInput;

  @Field(() => UserCreateWithoutOwnProjectInput, { nullable: false })
  @Type(() => UserCreateWithoutOwnProjectInput)
  create!: UserCreateWithoutOwnProjectInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
