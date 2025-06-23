import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationCreateManyTypeInput } from './task-to-task-relation-create-many-type.input';

@InputType()
export class TaskToTaskRelationCreateManyTypeInputEnvelope {
  @Field(() => [TaskToTaskRelationCreateManyTypeInput], { nullable: false })
  @Type(() => TaskToTaskRelationCreateManyTypeInput)
  data!: Array<TaskToTaskRelationCreateManyTypeInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
