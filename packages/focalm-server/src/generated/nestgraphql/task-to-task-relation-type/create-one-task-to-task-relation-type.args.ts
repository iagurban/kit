import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationTypeCreateInput } from './task-to-task-relation-type-create.input';

@ArgsType()
export class CreateOneTaskToTaskRelationTypeArgs {
  @Field(() => TaskToTaskRelationTypeCreateInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeCreateInput)
  data!: TaskToTaskRelationTypeCreateInput;
}
