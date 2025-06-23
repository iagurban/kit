import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ParticipantRoleWhereInput } from './participant-role-where.input';

@ArgsType()
export class DeleteManyParticipantRoleArgs {
  @Field(() => ParticipantRoleWhereInput, { nullable: true })
  @Type(() => ParticipantRoleWhereInput)
  where?: ParticipantRoleWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
