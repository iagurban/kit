import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutAuthoredTaskChangesInput } from './user-create-without-authored-task-changes.input';
import { UserUpdateWithoutAuthoredTaskChangesInput } from './user-update-without-authored-task-changes.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutAuthoredTaskChangesInput {
  @Field(() => UserUpdateWithoutAuthoredTaskChangesInput, { nullable: false })
  @Type(() => UserUpdateWithoutAuthoredTaskChangesInput)
  update!: UserUpdateWithoutAuthoredTaskChangesInput;

  @Field(() => UserCreateWithoutAuthoredTaskChangesInput, { nullable: false })
  @Type(() => UserCreateWithoutAuthoredTaskChangesInput)
  create!: UserCreateWithoutAuthoredTaskChangesInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
