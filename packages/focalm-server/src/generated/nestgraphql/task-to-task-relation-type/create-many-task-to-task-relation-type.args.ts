import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationTypeCreateManyInput } from './task-to-task-relation-type-create-many.input';

@ArgsType()
export class CreateManyTaskToTaskRelationTypeArgs {
  @Field(() => [TaskToTaskRelationTypeCreateManyInput], { nullable: false })
  @Type(() => TaskToTaskRelationTypeCreateManyInput)
  data!: Array<TaskToTaskRelationTypeCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
