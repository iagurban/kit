import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskUpdateWithoutProjectInput } from './task-update-without-project.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpdateWithWhereUniqueWithoutProjectInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskUpdateWithoutProjectInput, { nullable: false })
  @Type(() => TaskUpdateWithoutProjectInput)
  data!: TaskUpdateWithoutProjectInput;
}
