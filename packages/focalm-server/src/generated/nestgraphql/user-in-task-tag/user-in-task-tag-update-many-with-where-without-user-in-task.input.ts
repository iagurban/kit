import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskTagScalarWhereInput } from './user-in-task-tag-scalar-where.input';
import { UserInTaskTagUncheckedUpdateManyWithoutUserInTaskInput } from './user-in-task-tag-unchecked-update-many-without-user-in-task.input';

@InputType()
export class UserInTaskTagUpdateManyWithWhereWithoutUserInTaskInput {
  @Field(() => UserInTaskTagScalarWhereInput, { nullable: false })
  @Type(() => UserInTaskTagScalarWhereInput)
  where!: UserInTaskTagScalarWhereInput;

  @Field(() => UserInTaskTagUncheckedUpdateManyWithoutUserInTaskInput, { nullable: false })
  @Type(() => UserInTaskTagUncheckedUpdateManyWithoutUserInTaskInput)
  data!: UserInTaskTagUncheckedUpdateManyWithoutUserInTaskInput;
}
