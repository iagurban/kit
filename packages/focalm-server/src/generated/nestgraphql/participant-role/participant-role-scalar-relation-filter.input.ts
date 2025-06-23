import { Field, InputType } from '@nestjs/graphql';

import { ParticipantRoleWhereInput } from './participant-role-where.input';

@InputType()
export class ParticipantRoleScalarRelationFilter {
  @Field(() => ParticipantRoleWhereInput, { nullable: true })
  is?: ParticipantRoleWhereInput;

  @Field(() => ParticipantRoleWhereInput, { nullable: true })
  isNot?: ParticipantRoleWhereInput;
}
