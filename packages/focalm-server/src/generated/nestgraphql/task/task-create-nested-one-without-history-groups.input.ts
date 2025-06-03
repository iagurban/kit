import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateOrConnectWithoutHistoryGroupsInput } from './task-create-or-connect-without-history-groups.input';
import { TaskCreateWithoutHistoryGroupsInput } from './task-create-without-history-groups.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskCreateNestedOneWithoutHistoryGroupsInput {
  @Field(() => TaskCreateWithoutHistoryGroupsInput, { nullable: true })
  @Type(() => TaskCreateWithoutHistoryGroupsInput)
  create?: TaskCreateWithoutHistoryGroupsInput;

  @Field(() => TaskCreateOrConnectWithoutHistoryGroupsInput, { nullable: true })
  @Type(() => TaskCreateOrConnectWithoutHistoryGroupsInput)
  connectOrCreate?: TaskCreateOrConnectWithoutHistoryGroupsInput;

  @Field(() => TaskWhereUniqueInput, { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;
}
