import { Field, InputType } from '@nestjs/graphql';

import { TaskToTaskRelationTypeWhereInput } from './task-to-task-relation-type-where.input';

@InputType()
export class TaskToTaskRelationTypeScalarRelationFilter {
  @Field(() => TaskToTaskRelationTypeWhereInput, { nullable: true })
  is?: TaskToTaskRelationTypeWhereInput;

  @Field(() => TaskToTaskRelationTypeWhereInput, { nullable: true })
  isNot?: TaskToTaskRelationTypeWhereInput;
}
