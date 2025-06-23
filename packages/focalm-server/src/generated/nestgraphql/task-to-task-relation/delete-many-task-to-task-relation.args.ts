import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationWhereInput } from './task-to-task-relation-where.input';

@ArgsType()
export class DeleteManyTaskToTaskRelationArgs {
  @Field(() => TaskToTaskRelationWhereInput, { nullable: true })
  @Type(() => TaskToTaskRelationWhereInput)
  where?: TaskToTaskRelationWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
