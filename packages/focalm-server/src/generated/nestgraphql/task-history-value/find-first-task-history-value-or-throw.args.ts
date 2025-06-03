import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryValueOrderByWithRelationInput } from './task-history-value-order-by-with-relation.input';
import { TaskHistoryValueScalarFieldEnum } from './task-history-value-scalar-field.enum';
import { TaskHistoryValueWhereInput } from './task-history-value-where.input';
import { TaskHistoryValueWhereUniqueInput } from './task-history-value-where-unique.input';

@ArgsType()
export class FindFirstTaskHistoryValueOrThrowArgs {
  @Field(() => TaskHistoryValueWhereInput, { nullable: true })
  @Type(() => TaskHistoryValueWhereInput)
  where?: TaskHistoryValueWhereInput;

  @Field(() => [TaskHistoryValueOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TaskHistoryValueOrderByWithRelationInput>;

  @Field(() => TaskHistoryValueWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'groupId_key'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [TaskHistoryValueScalarFieldEnum], { nullable: true })
  distinct?: Array<`${TaskHistoryValueScalarFieldEnum}`>;
}
