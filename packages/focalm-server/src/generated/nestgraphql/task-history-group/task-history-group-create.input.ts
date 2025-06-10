import { Field, InputType } from '@nestjs/graphql';

import { CreatedAtFixReason } from '../prisma/created-at-fix-reason.enum';
import { TaskHistoryValueCreateNestedManyWithoutGroupInput } from '../task-history-value/task-history-value-create-nested-many-without-group.input';
import { UserCreateNestedOneWithoutAuthoredTaskChangesInput } from '../user/user-create-nested-one-without-authored-task-changes.input';

@InputType()
export class TaskHistoryGroupCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: false })
  localCreatedAt!: Date | string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => CreatedAtFixReason, { nullable: true })
  createdAtFixReason?: `${CreatedAtFixReason}`;

  @Field(() => TaskHistoryValueCreateNestedManyWithoutGroupInput, { nullable: true })
  values?: TaskHistoryValueCreateNestedManyWithoutGroupInput;

  @Field(() => UserCreateNestedOneWithoutAuthoredTaskChangesInput, { nullable: false })
  author!: UserCreateNestedOneWithoutAuthoredTaskChangesInput;
}
