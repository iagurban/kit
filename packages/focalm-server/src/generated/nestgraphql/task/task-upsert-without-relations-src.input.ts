import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateWithoutRelationsSrcInput } from './task-create-without-relations-src.input';
import { TaskUpdateWithoutRelationsSrcInput } from './task-update-without-relations-src.input';
import { TaskWhereInput } from './task-where.input';

@InputType()
export class TaskUpsertWithoutRelationsSrcInput {
  @Field(() => TaskUpdateWithoutRelationsSrcInput, { nullable: false })
  @Type(() => TaskUpdateWithoutRelationsSrcInput)
  update!: TaskUpdateWithoutRelationsSrcInput;

  @Field(() => TaskCreateWithoutRelationsSrcInput, { nullable: false })
  @Type(() => TaskCreateWithoutRelationsSrcInput)
  create!: TaskCreateWithoutRelationsSrcInput;

  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;
}
