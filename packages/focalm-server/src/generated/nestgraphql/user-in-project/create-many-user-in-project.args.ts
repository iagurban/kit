import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInProjectCreateManyInput } from './user-in-project-create-many.input';

@ArgsType()
export class CreateManyUserInProjectArgs {
  @Field(() => [UserInProjectCreateManyInput], { nullable: false })
  @Type(() => UserInProjectCreateManyInput)
  data!: Array<UserInProjectCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
