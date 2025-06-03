import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskUpdateWithoutAuthorInput } from './task-update-without-author.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpdateWithWhereUniqueWithoutAuthorInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskUpdateWithoutAuthorInput, { nullable: false })
  @Type(() => TaskUpdateWithoutAuthorInput)
  data!: TaskUpdateWithoutAuthorInput;
}
