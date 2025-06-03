import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateOrConnectWithoutHistoryGroupsInput } from './task-create-or-connect-without-history-groups.input';
import { TaskCreateWithoutHistoryGroupsInput } from './task-create-without-history-groups.input';
import { TaskUpdateToOneWithWhereWithoutHistoryGroupsInput } from './task-update-to-one-with-where-without-history-groups.input';
import { TaskUpsertWithoutHistoryGroupsInput } from './task-upsert-without-history-groups.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpdateOneRequiredWithoutHistoryGroupsNestedInput {
  @Field(() => TaskCreateWithoutHistoryGroupsInput, { nullable: true })
  @Type(() => TaskCreateWithoutHistoryGroupsInput)
  create?: TaskCreateWithoutHistoryGroupsInput;

  @Field(() => TaskCreateOrConnectWithoutHistoryGroupsInput, { nullable: true })
  @Type(() => TaskCreateOrConnectWithoutHistoryGroupsInput)
  connectOrCreate?: TaskCreateOrConnectWithoutHistoryGroupsInput;

  @Field(() => TaskUpsertWithoutHistoryGroupsInput, { nullable: true })
  @Type(() => TaskUpsertWithoutHistoryGroupsInput)
  upsert?: TaskUpsertWithoutHistoryGroupsInput;

  @Field(() => TaskWhereUniqueInput, { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskUpdateToOneWithWhereWithoutHistoryGroupsInput, { nullable: true })
  @Type(() => TaskUpdateToOneWithWhereWithoutHistoryGroupsInput)
  update?: TaskUpdateToOneWithWhereWithoutHistoryGroupsInput;
}
