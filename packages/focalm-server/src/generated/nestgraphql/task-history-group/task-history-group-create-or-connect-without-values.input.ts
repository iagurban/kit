import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryGroupCreateWithoutValuesInput } from './task-history-group-create-without-values.input';
import { TaskHistoryGroupWhereUniqueInput } from './task-history-group-where-unique.input';

@InputType()
export class TaskHistoryGroupCreateOrConnectWithoutValuesInput {
  @Field(() => TaskHistoryGroupWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryGroupWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>;

  @Field(() => TaskHistoryGroupCreateWithoutValuesInput, { nullable: false })
  @Type(() => TaskHistoryGroupCreateWithoutValuesInput)
  create!: TaskHistoryGroupCreateWithoutValuesInput;
}
