import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskTagCreateManyInput } from './user-in-task-tag-create-many.input';

@ArgsType()
export class CreateManyUserInTaskTagArgs {
  @Field(() => [UserInTaskTagCreateManyInput], { nullable: false })
  @Type(() => UserInTaskTagCreateManyInput)
  data!: Array<UserInTaskTagCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
