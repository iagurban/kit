import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateManyParentInput } from './task-create-many-parent.input';

@InputType()
export class TaskCreateManyParentInputEnvelope {
  @Field(() => [TaskCreateManyParentInput], { nullable: false })
  @Type(() => TaskCreateManyParentInput)
  data!: Array<TaskCreateManyParentInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
