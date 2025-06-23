import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInProjectUpdateManyMutationInput } from './user-in-project-update-many-mutation.input';
import { UserInProjectWhereInput } from './user-in-project-where.input';

@ArgsType()
export class UpdateManyUserInProjectArgs {
  @Field(() => UserInProjectUpdateManyMutationInput, { nullable: false })
  @Type(() => UserInProjectUpdateManyMutationInput)
  data!: UserInProjectUpdateManyMutationInput;

  @Field(() => UserInProjectWhereInput, { nullable: true })
  @Type(() => UserInProjectWhereInput)
  where?: UserInProjectWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
