import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskCreateManyInput } from './user-in-task-create-many.input';

@ArgsType()
export class CreateManyUserInTaskArgs {
  @Field(() => [UserInTaskCreateManyInput], { nullable: false })
  @Type(() => UserInTaskCreateManyInput)
  data!: Array<UserInTaskCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
