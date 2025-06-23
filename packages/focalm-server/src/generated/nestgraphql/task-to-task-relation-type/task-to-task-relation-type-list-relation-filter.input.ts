import { Field, InputType } from '@nestjs/graphql';

import { TaskToTaskRelationTypeWhereInput } from './task-to-task-relation-type-where.input';

@InputType()
export class TaskToTaskRelationTypeListRelationFilter {
  @Field(() => TaskToTaskRelationTypeWhereInput, { nullable: true })
  every?: TaskToTaskRelationTypeWhereInput;

  @Field(() => TaskToTaskRelationTypeWhereInput, { nullable: true })
  some?: TaskToTaskRelationTypeWhereInput;

  @Field(() => TaskToTaskRelationTypeWhereInput, { nullable: true })
  none?: TaskToTaskRelationTypeWhereInput;
}
