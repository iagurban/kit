import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutParticipatingTasksInput } from './user-create-without-participating-tasks.input';
import { UserUpdateWithoutParticipatingTasksInput } from './user-update-without-participating-tasks.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutParticipatingTasksInput {
  @Field(() => UserUpdateWithoutParticipatingTasksInput, { nullable: false })
  @Type(() => UserUpdateWithoutParticipatingTasksInput)
  update!: UserUpdateWithoutParticipatingTasksInput;

  @Field(() => UserCreateWithoutParticipatingTasksInput, { nullable: false })
  @Type(() => UserCreateWithoutParticipatingTasksInput)
  create!: UserCreateWithoutParticipatingTasksInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
