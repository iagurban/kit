import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateOrConnectWithoutChildrenInput } from './task-create-or-connect-without-children.input';
import { TaskCreateWithoutChildrenInput } from './task-create-without-children.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskCreateNestedOneWithoutChildrenInput {
  @Field(() => TaskCreateWithoutChildrenInput, { nullable: true })
  @Type(() => TaskCreateWithoutChildrenInput)
  create?: TaskCreateWithoutChildrenInput;

  @Field(() => TaskCreateOrConnectWithoutChildrenInput, { nullable: true })
  @Type(() => TaskCreateOrConnectWithoutChildrenInput)
  connectOrCreate?: TaskCreateOrConnectWithoutChildrenInput;

  @Field(() => TaskWhereUniqueInput, { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;
}
