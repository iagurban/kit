import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskCreateManyTaskInput } from './user-in-task-create-many-task.input';

@InputType()
export class UserInTaskCreateManyTaskInputEnvelope {
  @Field(() => [UserInTaskCreateManyTaskInput], { nullable: false })
  @Type(() => UserInTaskCreateManyTaskInput)
  data!: Array<UserInTaskCreateManyTaskInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
