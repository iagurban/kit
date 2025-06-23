import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationTypeWhereInput } from './task-to-task-relation-type-where.input';

@ArgsType()
export class DeleteManyTaskToTaskRelationTypeArgs {
  @Field(() => TaskToTaskRelationTypeWhereInput, { nullable: true })
  @Type(() => TaskToTaskRelationTypeWhereInput)
  where?: TaskToTaskRelationTypeWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
