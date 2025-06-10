import { Field, InputType } from '@nestjs/graphql';

import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class UserInTaskScalarWhereWithAggregatesInput {
  @Field(() => [UserInTaskScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<UserInTaskScalarWhereWithAggregatesInput>;

  @Field(() => [UserInTaskScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<UserInTaskScalarWhereWithAggregatesInput>;

  @Field(() => [UserInTaskScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<UserInTaskScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  id?: UuidWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  userId?: UuidWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  taskId?: UuidWithAggregatesFilter;
}
