import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInProjectCreateInput } from './user-in-project-create.input';

@ArgsType()
export class CreateOneUserInProjectArgs {
  @Field(() => UserInProjectCreateInput, { nullable: false })
  @Type(() => UserInProjectCreateInput)
  data!: UserInProjectCreateInput;
}
