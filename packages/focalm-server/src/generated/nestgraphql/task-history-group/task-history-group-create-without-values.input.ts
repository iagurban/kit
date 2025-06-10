import { Field, InputType } from '@nestjs/graphql';

import { CreatedAtFixReason } from '../prisma/created-at-fix-reason.enum';
import { UserCreateNestedOneWithoutAuthoredTaskChangesInput } from '../user/user-create-nested-one-without-authored-task-changes.input';

@InputType()
export class TaskHistoryGroupCreateWithoutValuesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: false })
  localCreatedAt!: Date | string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => CreatedAtFixReason, { nullable: true })
  createdAtFixReason?: `${CreatedAtFixReason}`;

  @Field(() => UserCreateNestedOneWithoutAuthoredTaskChangesInput, { nullable: false })
  author!: UserCreateNestedOneWithoutAuthoredTaskChangesInput;
}
