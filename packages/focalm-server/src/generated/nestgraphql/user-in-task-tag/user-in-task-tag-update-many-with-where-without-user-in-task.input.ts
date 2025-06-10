import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskTagScalarWhereInput } from './user-in-task-tag-scalar-where.input';
import { UserInTaskTagUpdateManyMutationInput } from './user-in-task-tag-update-many-mutation.input';

@InputType()
export class UserInTaskTagUpdateManyWithWhereWithoutUserInTaskInput {
  @Field(() => UserInTaskTagScalarWhereInput, { nullable: false })
  @Type(() => UserInTaskTagScalarWhereInput)
  where!: UserInTaskTagScalarWhereInput;

  @Field(() => UserInTaskTagUpdateManyMutationInput, { nullable: false })
  @Type(() => UserInTaskTagUpdateManyMutationInput)
  data!: UserInTaskTagUpdateManyMutationInput;
}
