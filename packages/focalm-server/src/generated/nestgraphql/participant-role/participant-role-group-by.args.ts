import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ParticipantRoleCountAggregateInput } from './participant-role-count-aggregate.input';
import { ParticipantRoleMaxAggregateInput } from './participant-role-max-aggregate.input';
import { ParticipantRoleMinAggregateInput } from './participant-role-min-aggregate.input';
import { ParticipantRoleOrderByWithAggregationInput } from './participant-role-order-by-with-aggregation.input';
import { ParticipantRoleScalarFieldEnum } from './participant-role-scalar-field.enum';
import { ParticipantRoleScalarWhereWithAggregatesInput } from './participant-role-scalar-where-with-aggregates.input';
import { ParticipantRoleWhereInput } from './participant-role-where.input';

@ArgsType()
export class ParticipantRoleGroupByArgs {
  @Field(() => ParticipantRoleWhereInput, { nullable: true })
  @Type(() => ParticipantRoleWhereInput)
  where?: ParticipantRoleWhereInput;

  @Field(() => [ParticipantRoleOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<ParticipantRoleOrderByWithAggregationInput>;

  @Field(() => [ParticipantRoleScalarFieldEnum], { nullable: false })
  by!: Array<`${ParticipantRoleScalarFieldEnum}`>;

  @Field(() => ParticipantRoleScalarWhereWithAggregatesInput, { nullable: true })
  having?: ParticipantRoleScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => ParticipantRoleCountAggregateInput, { nullable: true })
  _count?: ParticipantRoleCountAggregateInput;

  @Field(() => ParticipantRoleMinAggregateInput, { nullable: true })
  _min?: ParticipantRoleMinAggregateInput;

  @Field(() => ParticipantRoleMaxAggregateInput, { nullable: true })
  _max?: ParticipantRoleMaxAggregateInput;
}
