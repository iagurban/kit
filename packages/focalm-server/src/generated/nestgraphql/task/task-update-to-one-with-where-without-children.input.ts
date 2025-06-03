import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskUpdateWithoutChildrenInput } from './task-update-without-children.input';
import { TaskWhereInput } from './task-where.input';

@InputType()
export class TaskUpdateToOneWithWhereWithoutChildrenInput {
  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;

  @Field(() => TaskUpdateWithoutChildrenInput, { nullable: false })
  @Type(() => TaskUpdateWithoutChildrenInput)
  data!: TaskUpdateWithoutChildrenInput;
}
