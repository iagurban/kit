import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskCreateInput } from './user-in-task-create.input';

@ArgsType()
export class CreateOneUserInTaskArgs {
  @Field(() => UserInTaskCreateInput, { nullable: false })
  @Type(() => UserInTaskCreateInput)
  data!: UserInTaskCreateInput;
}
