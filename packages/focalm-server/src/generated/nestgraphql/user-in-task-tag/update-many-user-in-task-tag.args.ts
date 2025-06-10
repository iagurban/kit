import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskTagUpdateManyMutationInput } from './user-in-task-tag-update-many-mutation.input';
import { UserInTaskTagWhereInput } from './user-in-task-tag-where.input';

@ArgsType()
export class UpdateManyUserInTaskTagArgs {
  @Field(() => UserInTaskTagUpdateManyMutationInput, { nullable: false })
  @Type(() => UserInTaskTagUpdateManyMutationInput)
  data!: UserInTaskTagUpdateManyMutationInput;

  @Field(() => UserInTaskTagWhereInput, { nullable: true })
  @Type(() => UserInTaskTagWhereInput)
  where?: UserInTaskTagWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
