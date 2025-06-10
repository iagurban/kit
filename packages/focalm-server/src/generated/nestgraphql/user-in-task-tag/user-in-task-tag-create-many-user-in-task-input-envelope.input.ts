import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskTagCreateManyUserInTaskInput } from './user-in-task-tag-create-many-user-in-task.input';

@InputType()
export class UserInTaskTagCreateManyUserInTaskInputEnvelope {
  @Field(() => [UserInTaskTagCreateManyUserInTaskInput], { nullable: false })
  @Type(() => UserInTaskTagCreateManyUserInTaskInput)
  data!: Array<UserInTaskTagCreateManyUserInTaskInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
