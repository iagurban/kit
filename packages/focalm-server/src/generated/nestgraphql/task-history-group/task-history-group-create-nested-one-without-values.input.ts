import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryGroupCreateOrConnectWithoutValuesInput } from './task-history-group-create-or-connect-without-values.input';
import { TaskHistoryGroupCreateWithoutValuesInput } from './task-history-group-create-without-values.input';
import { TaskHistoryGroupWhereUniqueInput } from './task-history-group-where-unique.input';

@InputType()
export class TaskHistoryGroupCreateNestedOneWithoutValuesInput {
  @Field(() => TaskHistoryGroupCreateWithoutValuesInput, { nullable: true })
  @Type(() => TaskHistoryGroupCreateWithoutValuesInput)
  create?: TaskHistoryGroupCreateWithoutValuesInput;

  @Field(() => TaskHistoryGroupCreateOrConnectWithoutValuesInput, { nullable: true })
  @Type(() => TaskHistoryGroupCreateOrConnectWithoutValuesInput)
  connectOrCreate?: TaskHistoryGroupCreateOrConnectWithoutValuesInput;

  @Field(() => TaskHistoryGroupWhereUniqueInput, { nullable: true })
  @Type(() => TaskHistoryGroupWhereUniqueInput)
  connect?: Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>;
}
