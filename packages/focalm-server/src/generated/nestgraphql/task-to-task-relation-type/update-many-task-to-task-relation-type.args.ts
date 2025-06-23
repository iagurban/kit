import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationTypeUpdateManyMutationInput } from './task-to-task-relation-type-update-many-mutation.input';
import { TaskToTaskRelationTypeWhereInput } from './task-to-task-relation-type-where.input';

@ArgsType()
export class UpdateManyTaskToTaskRelationTypeArgs {
  @Field(() => TaskToTaskRelationTypeUpdateManyMutationInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeUpdateManyMutationInput)
  data!: TaskToTaskRelationTypeUpdateManyMutationInput;

  @Field(() => TaskToTaskRelationTypeWhereInput, { nullable: true })
  @Type(() => TaskToTaskRelationTypeWhereInput)
  where?: TaskToTaskRelationTypeWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
