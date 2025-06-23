import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ParticipantRoleOrderByWithRelationInput } from './participant-role-order-by-with-relation.input';
import { ParticipantRoleScalarFieldEnum } from './participant-role-scalar-field.enum';
import { ParticipantRoleWhereInput } from './participant-role-where.input';
import { ParticipantRoleWhereUniqueInput } from './participant-role-where-unique.input';

@ArgsType()
export class FindManyParticipantRoleArgs {
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

  @Field(() => [ParticipantRoleScalarFieldEnum], { nullable: true })
  distinct?: Array<`${ParticipantRoleScalarFieldEnum}`>;
}
