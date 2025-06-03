import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryValueCreateManyGroupInputEnvelope } from './task-history-value-create-many-group-input-envelope.input';
import { TaskHistoryValueCreateOrConnectWithoutGroupInput } from './task-history-value-create-or-connect-without-group.input';
import { TaskHistoryValueCreateWithoutGroupInput } from './task-history-value-create-without-group.input';
import { TaskHistoryValueWhereUniqueInput } from './task-history-value-where-unique.input';

@InputType()
export class TaskHistoryValueUncheckedCreateNestedManyWithoutGroupInput {
  @Field(() => [TaskHistoryValueCreateWithoutGroupInput], { nullable: true })
  @Type(() => TaskHistoryValueCreateWithoutGroupInput)
  create?: Array<TaskHistoryValueCreateWithoutGroupInput>;

  @Field(() => [TaskHistoryValueCreateOrConnectWithoutGroupInput], { nullable: true })
  @Type(() => TaskHistoryValueCreateOrConnectWithoutGroupInput)
  connectOrCreate?: Array<TaskHistoryValueCreateOrConnectWithoutGroupInput>;

  @Field(() => TaskHistoryValueCreateManyGroupInputEnvelope, { nullable: true })
  @Type(() => TaskHistoryValueCreateManyGroupInputEnvelope)
  createMany?: TaskHistoryValueCreateManyGroupInputEnvelope;

  @Field(() => [TaskHistoryValueWhereUniqueInput], { nullable: true })
  @Type(() => TaskHistoryValueWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'groupId_key'>>;
}
