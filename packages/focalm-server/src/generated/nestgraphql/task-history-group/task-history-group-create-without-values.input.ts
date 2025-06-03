import { Field, InputType } from '@nestjs/graphql';

import { CreatedAtFixReason } from '../prisma/created-at-fix-reason.enum';
import { TaskCreateNestedOneWithoutHistoryGroupsInput } from '../task/task-create-nested-one-without-history-groups.input';
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

  @Field(() => TaskCreateNestedOneWithoutHistoryGroupsInput, { nullable: false })
  task!: TaskCreateNestedOneWithoutHistoryGroupsInput;

  @Field(() => UserCreateNestedOneWithoutAuthoredTaskChangesInput, { nullable: false })
  author!: UserCreateNestedOneWithoutAuthoredTaskChangesInput;
}
