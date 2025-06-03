import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryGroupCreateManyAuthorInputEnvelope } from './task-history-group-create-many-author-input-envelope.input';
import { TaskHistoryGroupCreateOrConnectWithoutAuthorInput } from './task-history-group-create-or-connect-without-author.input';
import { TaskHistoryGroupCreateWithoutAuthorInput } from './task-history-group-create-without-author.input';
import { TaskHistoryGroupWhereUniqueInput } from './task-history-group-where-unique.input';

@InputType()
export class TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInput {
  @Field(() => [TaskHistoryGroupCreateWithoutAuthorInput], { nullable: true })
  @Type(() => TaskHistoryGroupCreateWithoutAuthorInput)
  create?: Array<TaskHistoryGroupCreateWithoutAuthorInput>;

  @Field(() => [TaskHistoryGroupCreateOrConnectWithoutAuthorInput], { nullable: true })
  @Type(() => TaskHistoryGroupCreateOrConnectWithoutAuthorInput)
  connectOrCreate?: Array<TaskHistoryGroupCreateOrConnectWithoutAuthorInput>;

  @Field(() => TaskHistoryGroupCreateManyAuthorInputEnvelope, { nullable: true })
  @Type(() => TaskHistoryGroupCreateManyAuthorInputEnvelope)
  createMany?: TaskHistoryGroupCreateManyAuthorInputEnvelope;

  @Field(() => [TaskHistoryGroupWhereUniqueInput], { nullable: true })
  @Type(() => TaskHistoryGroupWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>>;
}
