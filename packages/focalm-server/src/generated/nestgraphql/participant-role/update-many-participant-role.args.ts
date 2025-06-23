import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ParticipantRoleUpdateManyMutationInput } from './participant-role-update-many-mutation.input';
import { ParticipantRoleWhereInput } from './participant-role-where.input';

@ArgsType()
export class UpdateManyParticipantRoleArgs {
  @Field(() => ParticipantRoleUpdateManyMutationInput, { nullable: false })
  @Type(() => ParticipantRoleUpdateManyMutationInput)
  data!: ParticipantRoleUpdateManyMutationInput;

  @Field(() => ParticipantRoleWhereInput, { nullable: true })
  @Type(() => ParticipantRoleWhereInput)
  where?: ParticipantRoleWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
