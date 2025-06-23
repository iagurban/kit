import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationOrderByWithRelationInput } from './task-to-task-relation-order-by-with-relation.input';
import { TaskToTaskRelationScalarFieldEnum } from './task-to-task-relation-scalar-field.enum';
import { TaskToTaskRelationWhereInput } from './task-to-task-relation-where.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@ArgsType()
export class FindManyTaskToTaskRelationArgs {
  @Field(() => TaskToTaskRelationWhereInput, { nullable: true })
  @Type(() => TaskToTaskRelationWhereInput)
  where?: TaskToTaskRelationWhereInput;

  @Field(() => [TaskToTaskRelationOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TaskToTaskRelationOrderByWithRelationInput>;

  @Field(() => TaskToTaskRelationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [TaskToTaskRelationScalarFieldEnum], { nullable: true })
  distinct?: Array<`${TaskToTaskRelationScalarFieldEnum}`>;
}
