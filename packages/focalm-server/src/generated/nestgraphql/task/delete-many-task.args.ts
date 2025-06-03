import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskWhereInput } from './task-where.input';

@ArgsType()
export class DeleteManyTaskArgs {
  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
