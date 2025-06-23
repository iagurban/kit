import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationTypeCreateManyProjectInput } from './task-to-task-relation-type-create-many-project.input';

@InputType()
export class TaskToTaskRelationTypeCreateManyProjectInputEnvelope {
  @Field(() => [TaskToTaskRelationTypeCreateManyProjectInput], { nullable: false })
  @Type(() => TaskToTaskRelationTypeCreateManyProjectInput)
  data!: Array<TaskToTaskRelationTypeCreateManyProjectInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
