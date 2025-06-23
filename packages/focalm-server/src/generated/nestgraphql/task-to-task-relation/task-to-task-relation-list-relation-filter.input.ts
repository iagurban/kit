import { Field, InputType } from '@nestjs/graphql';

import { TaskToTaskRelationWhereInput } from './task-to-task-relation-where.input';

@InputType()
export class TaskToTaskRelationListRelationFilter {
  @Field(() => TaskToTaskRelationWhereInput, { nullable: true })
  every?: TaskToTaskRelationWhereInput;

  @Field(() => TaskToTaskRelationWhereInput, { nullable: true })
  some?: TaskToTaskRelationWhereInput;

  @Field(() => TaskToTaskRelationWhereInput, { nullable: true })
  none?: TaskToTaskRelationWhereInput;
}
