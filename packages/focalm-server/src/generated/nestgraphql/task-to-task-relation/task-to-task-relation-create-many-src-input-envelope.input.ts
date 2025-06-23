import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationCreateManySrcInput } from './task-to-task-relation-create-many-src.input';

@InputType()
export class TaskToTaskRelationCreateManySrcInputEnvelope {
  @Field(() => [TaskToTaskRelationCreateManySrcInput], { nullable: false })
  @Type(() => TaskToTaskRelationCreateManySrcInput)
  data!: Array<TaskToTaskRelationCreateManySrcInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
