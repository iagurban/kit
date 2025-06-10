import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutParticipatingTasksInput } from './user-update-without-participating-tasks.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutParticipatingTasksInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutParticipatingTasksInput, { nullable: false })
  @Type(() => UserUpdateWithoutParticipatingTasksInput)
  data!: UserUpdateWithoutParticipatingTasksInput;
}
