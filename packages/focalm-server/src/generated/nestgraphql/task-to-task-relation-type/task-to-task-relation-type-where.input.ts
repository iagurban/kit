import { Field, InputType } from '@nestjs/graphql';

import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { ProjectScalarRelationFilter } from '../project/project-scalar-relation-filter.input';
import { TaskToTaskRelationListRelationFilter } from '../task-to-task-relation/task-to-task-relation-list-relation-filter.input';

@InputType()
export class TaskToTaskRelationTypeWhereInput {
  @Field(() => [TaskToTaskRelationTypeWhereInput], { nullable: true })
  AND?: Array<TaskToTaskRelationTypeWhereInput>;

  @Field(() => [TaskToTaskRelationTypeWhereInput], { nullable: true })
  OR?: Array<TaskToTaskRelationTypeWhereInput>;

  @Field(() => [TaskToTaskRelationTypeWhereInput], { nullable: true })
  NOT?: Array<TaskToTaskRelationTypeWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  forward?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  inverse?: StringFilter;

  @Field(() => UuidFilter, { nullable: true })
  projectId?: UuidFilter;

  @Field(() => TaskToTaskRelationListRelationFilter, { nullable: true })
  relations?: TaskToTaskRelationListRelationFilter;

  @Field(() => ProjectScalarRelationFilter, { nullable: true })
  project?: ProjectScalarRelationFilter;
}
