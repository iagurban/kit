import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ParticipantRoleWhereUniqueInput } from './participant-role-where-unique.input';

@ArgsType()
export class FindUniqueParticipantRoleArgs {
  @Field(() => ParticipantRoleWhereUniqueInput, { nullable: false })
  @Type(() => ParticipantRoleWhereUniqueInput)
  where!: Prisma.AtLeast<ParticipantRoleWhereUniqueInput, 'id'>;
}
