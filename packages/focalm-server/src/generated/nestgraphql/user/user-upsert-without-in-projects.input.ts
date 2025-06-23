import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutInProjectsInput } from './user-create-without-in-projects.input';
import { UserUpdateWithoutInProjectsInput } from './user-update-without-in-projects.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutInProjectsInput {
  @Field(() => UserUpdateWithoutInProjectsInput, { nullable: false })
  @Type(() => UserUpdateWithoutInProjectsInput)
  update!: UserUpdateWithoutInProjectsInput;

  @Field(() => UserCreateWithoutInProjectsInput, { nullable: false })
  @Type(() => UserCreateWithoutInProjectsInput)
  create!: UserCreateWithoutInProjectsInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
