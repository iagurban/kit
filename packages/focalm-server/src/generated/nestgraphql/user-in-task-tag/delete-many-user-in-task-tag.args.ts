import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskTagWhereInput } from './user-in-task-tag-where.input';

@ArgsType()
export class DeleteManyUserInTaskTagArgs {
  @Field(() => UserInTaskTagWhereInput, { nullable: true })
  @Type(() => UserInTaskTagWhereInput)
  where?: UserInTaskTagWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
