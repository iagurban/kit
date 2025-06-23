import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationCreateInput } from './task-to-task-relation-create.input';

@ArgsType()
export class CreateOneTaskToTaskRelationArgs {
  @Field(() => TaskToTaskRelationCreateInput, { nullable: false })
  @Type(() => TaskToTaskRelationCreateInput)
  data!: TaskToTaskRelationCreateInput;
}
