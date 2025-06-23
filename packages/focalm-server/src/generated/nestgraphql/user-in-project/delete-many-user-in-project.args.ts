import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInProjectWhereInput } from './user-in-project-where.input';

@ArgsType()
export class DeleteManyUserInProjectArgs {
  @Field(() => UserInProjectWhereInput, { nullable: true })
  @Type(() => UserInProjectWhereInput)
  where?: UserInProjectWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
