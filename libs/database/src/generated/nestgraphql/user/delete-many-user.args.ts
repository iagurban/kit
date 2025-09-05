import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserWhereInput } from './user-where.input';

@ArgsType()
export class DeleteManyUserArgs {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
