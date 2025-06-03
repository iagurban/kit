import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryGroupUpdateWithoutAuthorInput } from './task-history-group-update-without-author.input';
import { TaskHistoryGroupWhereUniqueInput } from './task-history-group-where-unique.input';

@InputType()
export class TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInput {
  @Field(() => TaskHistoryGroupWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryGroupWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>;

  @Field(() => TaskHistoryGroupUpdateWithoutAuthorInput, { nullable: false })
  @Type(() => TaskHistoryGroupUpdateWithoutAuthorInput)
  data!: TaskHistoryGroupUpdateWithoutAuthorInput;
}
