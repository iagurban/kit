import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationUncheckedUpdateManyInput } from './task-to-task-relation-unchecked-update-many.input';
import { TaskToTaskRelationWhereInput } from './task-to-task-relation-where.input';

@ArgsType()
export class UpdateManyTaskToTaskRelationArgs {
  @Field(() => TaskToTaskRelationUncheckedUpdateManyInput, { nullable: false })
  @Type(() => TaskToTaskRelationUncheckedUpdateManyInput)
  data!: TaskToTaskRelationUncheckedUpdateManyInput;

  @Field(() => TaskToTaskRelationWhereInput, { nullable: true })
  @Type(() => TaskToTaskRelationWhereInput)
  where?: TaskToTaskRelationWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
