import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskUpdateWithoutRelationsSrcInput } from './task-update-without-relations-src.input';
import { TaskWhereInput } from './task-where.input';

@InputType()
export class TaskUpdateToOneWithWhereWithoutRelationsSrcInput {
  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;

  @Field(() => TaskUpdateWithoutRelationsSrcInput, { nullable: false })
  @Type(() => TaskUpdateWithoutRelationsSrcInput)
  data!: TaskUpdateWithoutRelationsSrcInput;
}
