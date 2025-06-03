import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryGroupCreateWithoutAuthorInput } from './task-history-group-create-without-author.input';
import { TaskHistoryGroupWhereUniqueInput } from './task-history-group-where-unique.input';

@InputType()
export class TaskHistoryGroupCreateOrConnectWithoutAuthorInput {
  @Field(() => TaskHistoryGroupWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryGroupWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>;

  @Field(() => TaskHistoryGroupCreateWithoutAuthorInput, { nullable: false })
  @Type(() => TaskHistoryGroupCreateWithoutAuthorInput)
  create!: TaskHistoryGroupCreateWithoutAuthorInput;
}
