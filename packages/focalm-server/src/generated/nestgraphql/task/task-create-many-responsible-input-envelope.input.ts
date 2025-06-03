import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateManyResponsibleInput } from './task-create-many-responsible.input';

@InputType()
export class TaskCreateManyResponsibleInputEnvelope {
  @Field(() => [TaskCreateManyResponsibleInput], { nullable: false })
  @Type(() => TaskCreateManyResponsibleInput)
  data!: Array<TaskCreateManyResponsibleInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
