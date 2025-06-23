import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryValueCreateWithoutGroupInput } from './task-history-value-create-without-group.input';
import { TaskHistoryValueUpdateWithoutGroupInput } from './task-history-value-update-without-group.input';
import { TaskHistoryValueWhereUniqueInput } from './task-history-value-where-unique.input';

@InputType()
export class TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInput {
  @Field(() => TaskHistoryValueWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryValueWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'id'>;

  @Field(() => TaskHistoryValueUpdateWithoutGroupInput, { nullable: false })
  @Type(() => TaskHistoryValueUpdateWithoutGroupInput)
  update!: TaskHistoryValueUpdateWithoutGroupInput;

  @Field(() => TaskHistoryValueCreateWithoutGroupInput, { nullable: false })
  @Type(() => TaskHistoryValueCreateWithoutGroupInput)
  create!: TaskHistoryValueCreateWithoutGroupInput;
}
