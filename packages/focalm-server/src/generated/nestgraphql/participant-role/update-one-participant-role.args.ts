import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ParticipantRoleUpdateInput } from './participant-role-update.input';
import { ParticipantRoleWhereUniqueInput } from './participant-role-where-unique.input';

@ArgsType()
export class UpdateOneParticipantRoleArgs {
  @Field(() => ParticipantRoleUpdateInput, { nullable: false })
  @Type(() => ParticipantRoleUpdateInput)
  data!: ParticipantRoleUpdateInput;

  @Field(() => ParticipantRoleWhereUniqueInput, { nullable: false })
  @Type(() => ParticipantRoleWhereUniqueInput)
  where!: Prisma.AtLeast<ParticipantRoleWhereUniqueInput, 'id'>;
}
