import { Field, InputType } from '@nestjs/graphql';

import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class ParticipantRoleScalarWhereWithAggregatesInput {
  @Field(() => [ParticipantRoleScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<ParticipantRoleScalarWhereWithAggregatesInput>;

  @Field(() => [ParticipantRoleScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<ParticipantRoleScalarWhereWithAggregatesInput>;

  @Field(() => [ParticipantRoleScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<ParticipantRoleScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  id?: UuidWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  color?: StringWithAggregatesFilter;
}
