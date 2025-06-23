import { Field, InputType } from '@nestjs/graphql';

import { BigIntFilter } from '../prisma/big-int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { TaskListRelationFilter } from '../task/task-list-relation-filter.input';
import { TaskToTaskRelationTypeListRelationFilter } from '../task-to-task-relation-type/task-to-task-relation-type-list-relation-filter.input';
import { UserNullableScalarRelationFilter } from '../user/user-nullable-scalar-relation-filter.input';
import { UserInProjectListRelationFilter } from '../user-in-project/user-in-project-list-relation-filter.input';
import { ProjectWhereInput } from './project-where.input';

@InputType()
export class ProjectWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => [ProjectWhereInput], { nullable: true })
  AND?: Array<ProjectWhereInput>;

  @Field(() => [ProjectWhereInput], { nullable: true })
  OR?: Array<ProjectWhereInput>;

  @Field(() => [ProjectWhereInput], { nullable: true })
  NOT?: Array<ProjectWhereInput>;

  @Field(() => BigIntFilter, { nullable: true })
  tasksCounter?: BigIntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  abbrev?: StringNullableFilter;

  @Field(() => UserNullableScalarRelationFilter, { nullable: true })
  ownOf?: UserNullableScalarRelationFilter;

  @Field(() => TaskToTaskRelationTypeListRelationFilter, { nullable: true })
  relationTypes?: TaskToTaskRelationTypeListRelationFilter;

  @Field(() => TaskListRelationFilter, { nullable: true })
  tasks?: TaskListRelationFilter;

  @Field(() => UserInProjectListRelationFilter, { nullable: true })
  usersPermissions?: UserInProjectListRelationFilter;
}
