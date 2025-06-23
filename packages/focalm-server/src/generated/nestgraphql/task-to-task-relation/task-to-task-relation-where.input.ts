import { Field, InputType } from '@nestjs/graphql';

import { UuidFilter } from '../prisma/uuid-filter.input';
import { TaskScalarRelationFilter } from '../task/task-scalar-relation-filter.input';
import { TaskToTaskRelationTypeScalarRelationFilter } from '../task-to-task-relation-type/task-to-task-relation-type-scalar-relation-filter.input';

@InputType()
export class TaskToTaskRelationWhereInput {
  @Field(() => [TaskToTaskRelationWhereInput], { nullable: true })
  AND?: Array<TaskToTaskRelationWhereInput>;

  @Field(() => [TaskToTaskRelationWhereInput], { nullable: true })
  OR?: Array<TaskToTaskRelationWhereInput>;

  @Field(() => [TaskToTaskRelationWhereInput], { nullable: true })
  NOT?: Array<TaskToTaskRelationWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  srcId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  dstId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  typeId?: UuidFilter;

  @Field(() => TaskScalarRelationFilter, { nullable: true })
  src?: TaskScalarRelationFilter;

  @Field(() => TaskScalarRelationFilter, { nullable: true })
  dst?: TaskScalarRelationFilter;

  @Field(() => TaskToTaskRelationTypeScalarRelationFilter, { nullable: true })
  type?: TaskToTaskRelationTypeScalarRelationFilter;
}
