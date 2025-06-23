import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationTypeOrderByWithRelationInput } from './task-to-task-relation-type-order-by-with-relation.input';
import { TaskToTaskRelationTypeScalarFieldEnum } from './task-to-task-relation-type-scalar-field.enum';
import { TaskToTaskRelationTypeWhereInput } from './task-to-task-relation-type-where.input';
import { TaskToTaskRelationTypeWhereUniqueInput } from './task-to-task-relation-type-where-unique.input';

@ArgsType()
export class FindFirstTaskToTaskRelationTypeArgs {
  @Field(() => TaskToTaskRelationTypeWhereInput, { nullable: true })
  @Type(() => TaskToTaskRelationTypeWhereInput)
  where?: TaskToTaskRelationTypeWhereInput;

  @Field(() => [TaskToTaskRelationTypeOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TaskToTaskRelationTypeOrderByWithRelationInput>;

  @Field(() => TaskToTaskRelationTypeWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<TaskToTaskRelationTypeWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [TaskToTaskRelationTypeScalarFieldEnum], { nullable: true })
  distinct?: Array<`${TaskToTaskRelationTypeScalarFieldEnum}`>;
}
