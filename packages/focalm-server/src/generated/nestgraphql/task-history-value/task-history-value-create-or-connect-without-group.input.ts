import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryValueCreateWithoutGroupInput } from './task-history-value-create-without-group.input';
import { TaskHistoryValueWhereUniqueInput } from './task-history-value-where-unique.input';

@InputType()
export class TaskHistoryValueCreateOrConnectWithoutGroupInput {
  @Field(() => TaskHistoryValueWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryValueWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'groupId_key'>;

  @Field(() => TaskHistoryValueCreateWithoutGroupInput, { nullable: false })
  @Type(() => TaskHistoryValueCreateWithoutGroupInput)
  create!: TaskHistoryValueCreateWithoutGroupInput;
}
