import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { EnumCreatedAtFixReasonNullableFilter } from '../prisma/enum-created-at-fix-reason-nullable-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class TaskHistoryGroupScalarWhereInput {
  @Field(() => [TaskHistoryGroupScalarWhereInput], { nullable: true })
  AND?: Array<TaskHistoryGroupScalarWhereInput>;

  @Field(() => [TaskHistoryGroupScalarWhereInput], { nullable: true })
  OR?: Array<TaskHistoryGroupScalarWhereInput>;

  @Field(() => [TaskHistoryGroupScalarWhereInput], { nullable: true })
  NOT?: Array<TaskHistoryGroupScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  taskId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  authorId?: UuidFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  localCreatedAt?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => EnumCreatedAtFixReasonNullableFilter, { nullable: true })
  createdAtFixReason?: EnumCreatedAtFixReasonNullableFilter;
}
