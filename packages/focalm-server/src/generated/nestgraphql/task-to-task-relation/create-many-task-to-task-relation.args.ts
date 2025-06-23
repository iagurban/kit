import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationCreateManyInput } from './task-to-task-relation-create-many.input';

@ArgsType()
export class CreateManyTaskToTaskRelationArgs {
  @Field(() => [TaskToTaskRelationCreateManyInput], { nullable: false })
  @Type(() => TaskToTaskRelationCreateManyInput)
  data!: Array<TaskToTaskRelationCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
