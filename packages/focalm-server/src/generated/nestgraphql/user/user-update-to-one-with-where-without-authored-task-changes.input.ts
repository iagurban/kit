import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutAuthoredTaskChangesInput } from './user-update-without-authored-task-changes.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutAuthoredTaskChangesInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutAuthoredTaskChangesInput, { nullable: false })
  @Type(() => UserUpdateWithoutAuthoredTaskChangesInput)
  data!: UserUpdateWithoutAuthoredTaskChangesInput;
}
