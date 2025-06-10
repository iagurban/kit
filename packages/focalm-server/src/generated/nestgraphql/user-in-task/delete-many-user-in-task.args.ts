import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskWhereInput } from './user-in-task-where.input';

@ArgsType()
export class DeleteManyUserInTaskArgs {
  @Field(() => UserInTaskWhereInput, { nullable: true })
  @Type(() => UserInTaskWhereInput)
  where?: UserInTaskWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
