import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationCreateManyDstInput } from './task-to-task-relation-create-many-dst.input';

@InputType()
export class TaskToTaskRelationCreateManyDstInputEnvelope {
  @Field(() => [TaskToTaskRelationCreateManyDstInput], { nullable: false })
  @Type(() => TaskToTaskRelationCreateManyDstInput)
  data!: Array<TaskToTaskRelationCreateManyDstInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
