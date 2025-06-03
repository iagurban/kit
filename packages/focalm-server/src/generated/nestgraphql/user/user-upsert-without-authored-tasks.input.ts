import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutAuthoredTasksInput } from './user-create-without-authored-tasks.input';
import { UserUpdateWithoutAuthoredTasksInput } from './user-update-without-authored-tasks.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutAuthoredTasksInput {
  @Field(() => UserUpdateWithoutAuthoredTasksInput, { nullable: false })
  @Type(() => UserUpdateWithoutAuthoredTasksInput)
  update!: UserUpdateWithoutAuthoredTasksInput;

  @Field(() => UserCreateWithoutAuthoredTasksInput, { nullable: false })
  @Type(() => UserCreateWithoutAuthoredTasksInput)
  create!: UserCreateWithoutAuthoredTasksInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
