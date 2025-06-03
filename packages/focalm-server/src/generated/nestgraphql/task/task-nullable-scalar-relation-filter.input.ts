import { Field, InputType } from '@nestjs/graphql';

import { TaskWhereInput } from './task-where.input';

@InputType()
export class TaskNullableScalarRelationFilter {
  @Field(() => TaskWhereInput, { nullable: true })
  is?: TaskWhereInput;

  @Field(() => TaskWhereInput, { nullable: true })
  isNot?: TaskWhereInput;
}
