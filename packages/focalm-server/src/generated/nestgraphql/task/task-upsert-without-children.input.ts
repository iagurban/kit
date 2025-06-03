import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateWithoutChildrenInput } from './task-create-without-children.input';
import { TaskUpdateWithoutChildrenInput } from './task-update-without-children.input';
import { TaskWhereInput } from './task-where.input';

@InputType()
export class TaskUpsertWithoutChildrenInput {
  @Field(() => TaskUpdateWithoutChildrenInput, { nullable: false })
  @Type(() => TaskUpdateWithoutChildrenInput)
  update!: TaskUpdateWithoutChildrenInput;

  @Field(() => TaskCreateWithoutChildrenInput, { nullable: false })
  @Type(() => TaskCreateWithoutChildrenInput)
  create!: TaskCreateWithoutChildrenInput;

  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;
}
