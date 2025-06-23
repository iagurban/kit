import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ParticipantRoleCountAggregateInput } from './participant-role-count-aggregate.input';
import { ParticipantRoleMaxAggregateInput } from './participant-role-max-aggregate.input';
import { ParticipantRoleMinAggregateInput } from './participant-role-min-aggregate.input';
import { ParticipantRoleOrderByWithRelationInput } from './participant-role-order-by-with-relation.input';
import { ParticipantRoleWhereInput } from './participant-role-where.input';
import { ParticipantRoleWhereUniqueInput } from './participant-role-where-unique.input';

@ArgsType()
export class ParticipantRoleAggregateArgs {
  @Field(() => ParticipantRoleWhereInput, { nullable: true })
  @Type(() => ParticipantRoleWhereInput)
  where?: ParticipantRoleWhereInput;

  @Field(() => [ParticipantRoleOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<ParticipantRoleOrderByWithRelationInput>;

  @Field(() => ParticipantRoleWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ParticipantRoleWhereUniqueInput, 'id'>;

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
