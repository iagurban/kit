import { Field, ObjectType } from '@nestjs/graphql';

import { ParticipantRoleCountAggregate } from './participant-role-count-aggregate.output';
import { ParticipantRoleMaxAggregate } from './participant-role-max-aggregate.output';
import { ParticipantRoleMinAggregate } from './participant-role-min-aggregate.output';

@ObjectType()
export class ParticipantRoleGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  color!: string;

  @Field(() => ParticipantRoleCountAggregate, { nullable: true })
  _count?: ParticipantRoleCountAggregate;

  @Field(() => ParticipantRoleMinAggregate, { nullable: true })
  _min?: ParticipantRoleMinAggregate;

  @Field(() => ParticipantRoleMaxAggregate, { nullable: true })
  _max?: ParticipantRoleMaxAggregate;
}
