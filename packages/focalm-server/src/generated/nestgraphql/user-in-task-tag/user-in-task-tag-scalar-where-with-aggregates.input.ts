import { Field, InputType } from '@nestjs/graphql';

import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class UserInTaskTagScalarWhereWithAggregatesInput {
  @Field(() => [UserInTaskTagScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<UserInTaskTagScalarWhereWithAggregatesInput>;

  @Field(() => [UserInTaskTagScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<UserInTaskTagScalarWhereWithAggregatesInput>;

  @Field(() => [UserInTaskTagScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<UserInTaskTagScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  userInTaskId?: UuidWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  tag?: StringWithAggregatesFilter;
}
