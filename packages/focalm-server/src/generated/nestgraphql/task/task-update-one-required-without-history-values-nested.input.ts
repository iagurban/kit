import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateOrConnectWithoutHistoryValuesInput } from './task-create-or-connect-without-history-values.input';
import { TaskCreateWithoutHistoryValuesInput } from './task-create-without-history-values.input';
import { TaskUpdateToOneWithWhereWithoutHistoryValuesInput } from './task-update-to-one-with-where-without-history-values.input';
import { TaskUpsertWithoutHistoryValuesInput } from './task-upsert-without-history-values.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpdateOneRequiredWithoutHistoryValuesNestedInput {
  @Field(() => TaskCreateWithoutHistoryValuesInput, { nullable: true })
  @Type(() => TaskCreateWithoutHistoryValuesInput)
  create?: TaskCreateWithoutHistoryValuesInput;

  @Field(() => TaskCreateOrConnectWithoutHistoryValuesInput, { nullable: true })
  @Type(() => TaskCreateOrConnectWithoutHistoryValuesInput)
  connectOrCreate?: TaskCreateOrConnectWithoutHistoryValuesInput;

  @Field(() => TaskUpsertWithoutHistoryValuesInput, { nullable: true })
  @Type(() => TaskUpsertWithoutHistoryValuesInput)
  upsert?: TaskUpsertWithoutHistoryValuesInput;

  @Field(() => TaskWhereUniqueInput, { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskUpdateToOneWithWhereWithoutHistoryValuesInput, { nullable: true })
  @Type(() => TaskUpdateToOneWithWhereWithoutHistoryValuesInput)
  update?: TaskUpdateToOneWithWhereWithoutHistoryValuesInput;
}
