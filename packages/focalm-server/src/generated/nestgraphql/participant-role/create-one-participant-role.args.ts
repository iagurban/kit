import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ParticipantRoleCreateInput } from './participant-role-create.input';

@ArgsType()
export class CreateOneParticipantRoleArgs {
  @Field(() => ParticipantRoleCreateInput, { nullable: false })
  @Type(() => ParticipantRoleCreateInput)
  data!: ParticipantRoleCreateInput;
}
