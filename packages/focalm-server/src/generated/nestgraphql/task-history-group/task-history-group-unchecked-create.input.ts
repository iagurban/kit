import { Field, InputType } from '@nestjs/graphql';

import { CreatedAtFixReason } from '../prisma/created-at-fix-reason.enum';
import { TaskHistoryValueUncheckedCreateNestedManyWithoutGroupInput } from '../task-history-value/task-history-value-unchecked-create-nested-many-without-group.input';

@InputType()
export class TaskHistoryGroupUncheckedCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  taskId!: string;

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => Date, { nullable: false })
  localCreatedAt!: Date | string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => CreatedAtFixReason, { nullable: true })
  createdAtFixReason?: `${CreatedAtFixReason}`;

  @Field(() => TaskHistoryValueUncheckedCreateNestedManyWithoutGroupInput, { nullable: true })
  values?: TaskHistoryValueUncheckedCreateNestedManyWithoutGroupInput;
}
