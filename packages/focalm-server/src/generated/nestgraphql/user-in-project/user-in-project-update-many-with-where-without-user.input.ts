import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInProjectScalarWhereInput } from './user-in-project-scalar-where.input';
import { UserInProjectUpdateManyMutationInput } from './user-in-project-update-many-mutation.input';

@InputType()
export class UserInProjectUpdateManyWithWhereWithoutUserInput {
  @Field(() => UserInProjectScalarWhereInput, { nullable: false })
  @Type(() => UserInProjectScalarWhereInput)
  where!: UserInProjectScalarWhereInput;

  @Field(() => UserInProjectUpdateManyMutationInput, { nullable: false })
  @Type(() => UserInProjectUpdateManyMutationInput)
  data!: UserInProjectUpdateManyMutationInput;
}
