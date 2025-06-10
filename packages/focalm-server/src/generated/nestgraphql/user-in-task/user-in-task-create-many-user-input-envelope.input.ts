import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskCreateManyUserInput } from './user-in-task-create-many-user.input';

@InputType()
export class UserInTaskCreateManyUserInputEnvelope {
  @Field(() => [UserInTaskCreateManyUserInput], { nullable: false })
  @Type(() => UserInTaskCreateManyUserInput)
  data!: Array<UserInTaskCreateManyUserInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
