import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryGroupOrderByWithRelationInput } from './task-history-group-order-by-with-relation.input';
import { TaskHistoryGroupScalarFieldEnum } from './task-history-group-scalar-field.enum';
import { TaskHistoryGroupWhereInput } from './task-history-group-where.input';
import { TaskHistoryGroupWhereUniqueInput } from './task-history-group-where-unique.input';

@ArgsType()
export class FindFirstTaskHistoryGroupOrThrowArgs {
  @Field(() => TaskHistoryGroupWhereInput, { nullable: true })
  @Type(() => TaskHistoryGroupWhereInput)
  where?: TaskHistoryGroupWhereInput;

  @Field(() => [TaskHistoryGroupOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TaskHistoryGroupOrderByWithRelationInput>;

  @Field(() => TaskHistoryGroupWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [TaskHistoryGroupScalarFieldEnum], { nullable: true })
  distinct?: Array<`${TaskHistoryGroupScalarFieldEnum}`>;
}
