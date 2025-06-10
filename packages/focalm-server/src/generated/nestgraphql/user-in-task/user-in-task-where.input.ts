import { Field, InputType } from '@nestjs/graphql';

import { UuidFilter } from '../prisma/uuid-filter.input';
import { TaskScalarRelationFilter } from '../task/task-scalar-relation-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';
import { UserInTaskTagListRelationFilter } from '../user-in-task-tag/user-in-task-tag-list-relation-filter.input';

@InputType()
export class UserInTaskWhereInput {
  @Field(() => [UserInTaskWhereInput], { nullable: true })
  AND?: Array<UserInTaskWhereInput>;

  @Field(() => [UserInTaskWhereInput], { nullable: true })
  OR?: Array<UserInTaskWhereInput>;

  @Field(() => [UserInTaskWhereInput], { nullable: true })
  NOT?: Array<UserInTaskWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  userId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  taskId?: UuidFilter;

  @Field(() => UserScalarRelationFilter, { nullable: true })
  user?: UserScalarRelationFilter;

  @Field(() => TaskScalarRelationFilter, { nullable: true })
  task?: TaskScalarRelationFilter;

  @Field(() => UserInTaskTagListRelationFilter, { nullable: true })
  tags?: UserInTaskTagListRelationFilter;
}
