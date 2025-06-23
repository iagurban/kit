import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInProjectCreateManyUserInput } from './user-in-project-create-many-user.input';

@InputType()
export class UserInProjectCreateManyUserInputEnvelope {
  @Field(() => [UserInProjectCreateManyUserInput], { nullable: false })
  @Type(() => UserInProjectCreateManyUserInput)
  data!: Array<UserInProjectCreateManyUserInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
