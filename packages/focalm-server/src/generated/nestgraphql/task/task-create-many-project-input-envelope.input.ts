import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateManyProjectInput } from './task-create-many-project.input';

@InputType()
export class TaskCreateManyProjectInputEnvelope {
  @Field(() => [TaskCreateManyProjectInput], { nullable: false })
  @Type(() => TaskCreateManyProjectInput)
  data!: Array<TaskCreateManyProjectInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
