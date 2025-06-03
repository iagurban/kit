import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryValueUpdateWithoutGroupInput } from './task-history-value-update-without-group.input';
import { TaskHistoryValueWhereUniqueInput } from './task-history-value-where-unique.input';

@InputType()
export class TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInput {
  @Field(() => TaskHistoryValueWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryValueWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'groupId_key'>;

  @Field(() => TaskHistoryValueUpdateWithoutGroupInput, { nullable: false })
  @Type(() => TaskHistoryValueUpdateWithoutGroupInput)
  data!: TaskHistoryValueUpdateWithoutGroupInput;
}
