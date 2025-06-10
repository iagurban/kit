import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskScalarWhereInput } from './user-in-task-scalar-where.input';
import { UserInTaskUpdateManyMutationInput } from './user-in-task-update-many-mutation.input';

@InputType()
export class UserInTaskUpdateManyWithWhereWithoutUserInput {
  @Field(() => UserInTaskScalarWhereInput, { nullable: false })
  @Type(() => UserInTaskScalarWhereInput)
  where!: UserInTaskScalarWhereInput;

  @Field(() => UserInTaskUpdateManyMutationInput, { nullable: false })
  @Type(() => UserInTaskUpdateManyMutationInput)
  data!: UserInTaskUpdateManyMutationInput;
}
