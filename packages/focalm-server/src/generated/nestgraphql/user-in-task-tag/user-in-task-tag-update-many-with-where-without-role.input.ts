import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskTagScalarWhereInput } from './user-in-task-tag-scalar-where.input';
import { UserInTaskTagUncheckedUpdateManyWithoutRoleInput } from './user-in-task-tag-unchecked-update-many-without-role.input';

@InputType()
export class UserInTaskTagUpdateManyWithWhereWithoutRoleInput {
  @Field(() => UserInTaskTagScalarWhereInput, { nullable: false })
  @Type(() => UserInTaskTagScalarWhereInput)
  where!: UserInTaskTagScalarWhereInput;

  @Field(() => UserInTaskTagUncheckedUpdateManyWithoutRoleInput, { nullable: false })
  @Type(() => UserInTaskTagUncheckedUpdateManyWithoutRoleInput)
  data!: UserInTaskTagUncheckedUpdateManyWithoutRoleInput;
}
