import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskUpdateManyMutationInput } from './user-in-task-update-many-mutation.input';
import { UserInTaskWhereInput } from './user-in-task-where.input';

@ArgsType()
export class UpdateManyUserInTaskArgs {
  @Field(() => UserInTaskUpdateManyMutationInput, { nullable: false })
  @Type(() => UserInTaskUpdateManyMutationInput)
  data!: UserInTaskUpdateManyMutationInput;

  @Field(() => UserInTaskWhereInput, { nullable: true })
  @Type(() => UserInTaskWhereInput)
  where?: UserInTaskWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
