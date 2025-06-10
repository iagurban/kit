import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskTagCreateInput } from './user-in-task-tag-create.input';

@ArgsType()
export class CreateOneUserInTaskTagArgs {
  @Field(() => UserInTaskTagCreateInput, { nullable: false })
  @Type(() => UserInTaskTagCreateInput)
  data!: UserInTaskTagCreateInput;
}
