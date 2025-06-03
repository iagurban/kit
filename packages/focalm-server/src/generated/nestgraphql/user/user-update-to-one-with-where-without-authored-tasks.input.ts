import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutAuthoredTasksInput } from './user-update-without-authored-tasks.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutAuthoredTasksInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutAuthoredTasksInput, { nullable: false })
  @Type(() => UserUpdateWithoutAuthoredTasksInput)
  data!: UserUpdateWithoutAuthoredTasksInput;
}
