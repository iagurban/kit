import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryGroupCreateOrConnectWithoutValuesInput } from './task-history-group-create-or-connect-without-values.input';
import { TaskHistoryGroupCreateWithoutValuesInput } from './task-history-group-create-without-values.input';
import { TaskHistoryGroupUpdateToOneWithWhereWithoutValuesInput } from './task-history-group-update-to-one-with-where-without-values.input';
import { TaskHistoryGroupUpsertWithoutValuesInput } from './task-history-group-upsert-without-values.input';
import { TaskHistoryGroupWhereUniqueInput } from './task-history-group-where-unique.input';

@InputType()
export class TaskHistoryGroupUpdateOneRequiredWithoutValuesNestedInput {
  @Field(() => TaskHistoryGroupCreateWithoutValuesInput, { nullable: true })
  @Type(() => TaskHistoryGroupCreateWithoutValuesInput)
  create?: TaskHistoryGroupCreateWithoutValuesInput;

  @Field(() => TaskHistoryGroupCreateOrConnectWithoutValuesInput, { nullable: true })
  @Type(() => TaskHistoryGroupCreateOrConnectWithoutValuesInput)
  connectOrCreate?: TaskHistoryGroupCreateOrConnectWithoutValuesInput;

  @Field(() => TaskHistoryGroupUpsertWithoutValuesInput, { nullable: true })
  @Type(() => TaskHistoryGroupUpsertWithoutValuesInput)
  upsert?: TaskHistoryGroupUpsertWithoutValuesInput;

  @Field(() => TaskHistoryGroupWhereUniqueInput, { nullable: true })
  @Type(() => TaskHistoryGroupWhereUniqueInput)
  connect?: Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>;

  @Field(() => TaskHistoryGroupUpdateToOneWithWhereWithoutValuesInput, { nullable: true })
  @Type(() => TaskHistoryGroupUpdateToOneWithWhereWithoutValuesInput)
  update?: TaskHistoryGroupUpdateToOneWithWhereWithoutValuesInput;
}
