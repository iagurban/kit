import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateOrConnectWithoutChildrenInput } from './task-create-or-connect-without-children.input';
import { TaskCreateWithoutChildrenInput } from './task-create-without-children.input';
import { TaskUpdateToOneWithWhereWithoutChildrenInput } from './task-update-to-one-with-where-without-children.input';
import { TaskUpsertWithoutChildrenInput } from './task-upsert-without-children.input';
import { TaskWhereInput } from './task-where.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpdateOneWithoutChildrenNestedInput {
  @Field(() => TaskCreateWithoutChildrenInput, { nullable: true })
  @Type(() => TaskCreateWithoutChildrenInput)
  create?: TaskCreateWithoutChildrenInput;

  @Field(() => TaskCreateOrConnectWithoutChildrenInput, { nullable: true })
  @Type(() => TaskCreateOrConnectWithoutChildrenInput)
  connectOrCreate?: TaskCreateOrConnectWithoutChildrenInput;

  @Field(() => TaskUpsertWithoutChildrenInput, { nullable: true })
  @Type(() => TaskUpsertWithoutChildrenInput)
  upsert?: TaskUpsertWithoutChildrenInput;

  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  disconnect?: TaskWhereInput;

  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  delete?: TaskWhereInput;

  @Field(() => TaskWhereUniqueInput, { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskUpdateToOneWithWhereWithoutChildrenInput, { nullable: true })
  @Type(() => TaskUpdateToOneWithWhereWithoutChildrenInput)
  update?: TaskUpdateToOneWithWhereWithoutChildrenInput;
}
