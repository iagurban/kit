import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ParticipantRoleCreateInput } from './participant-role-create.input';
import { ParticipantRoleUpdateInput } from './participant-role-update.input';
import { ParticipantRoleWhereUniqueInput } from './participant-role-where-unique.input';

@ArgsType()
export class UpsertOneParticipantRoleArgs {
  @Field(() => ParticipantRoleWhereUniqueInput, { nullable: false })
  @Type(() => ParticipantRoleWhereUniqueInput)
  where!: Prisma.AtLeast<ParticipantRoleWhereUniqueInput, 'id'>;

  @Field(() => ParticipantRoleCreateInput, { nullable: false })
  @Type(() => ParticipantRoleCreateInput)
  create!: ParticipantRoleCreateInput;

  @Field(() => ParticipantRoleUpdateInput, { nullable: false })
  @Type(() => ParticipantRoleUpdateInput)
  update!: ParticipantRoleUpdateInput;
}
