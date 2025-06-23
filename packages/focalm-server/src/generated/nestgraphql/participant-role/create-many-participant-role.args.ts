import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ParticipantRoleCreateManyInput } from './participant-role-create-many.input';

@ArgsType()
export class CreateManyParticipantRoleArgs {
  @Field(() => [ParticipantRoleCreateManyInput], { nullable: false })
  @Type(() => ParticipantRoleCreateManyInput)
  data!: Array<ParticipantRoleCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
