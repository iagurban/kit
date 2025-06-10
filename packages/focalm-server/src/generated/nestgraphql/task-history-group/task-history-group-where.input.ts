import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { EnumCreatedAtFixReasonNullableFilter } from '../prisma/enum-created-at-fix-reason-nullable-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { TaskHistoryValueListRelationFilter } from '../task-history-value/task-history-value-list-relation-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';

@InputType()
export class TaskHistoryGroupWhereInput {
  @Field(() => [TaskHistoryGroupWhereInput], { nullable: true })
  AND?: Array<TaskHistoryGroupWhereInput>;

  @Field(() => [TaskHistoryGroupWhereInput], { nullable: true })
  OR?: Array<TaskHistoryGroupWhereInput>;

  @Field(() => [TaskHistoryGroupWhereInput], { nullable: true })
  NOT?: Array<TaskHistoryGroupWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  authorId?: UuidFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  localCreatedAt?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => EnumCreatedAtFixReasonNullableFilter, { nullable: true })
  createdAtFixReason?: EnumCreatedAtFixReasonNullableFilter;

  @Field(() => TaskHistoryValueListRelationFilter, { nullable: true })
  values?: TaskHistoryValueListRelationFilter;

  @Field(() => UserScalarRelationFilter, { nullable: true })
  author?: UserScalarRelationFilter;
}
