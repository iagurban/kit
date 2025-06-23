import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateWithoutRelationsDstInput } from './task-create-without-relations-dst.input';
import { TaskUpdateWithoutRelationsDstInput } from './task-update-without-relations-dst.input';
import { TaskWhereInput } from './task-where.input';

@InputType()
export class TaskUpsertWithoutRelationsDstInput {
  @Field(() => TaskUpdateWithoutRelationsDstInput, { nullable: false })
  @Type(() => TaskUpdateWithoutRelationsDstInput)
  update!: TaskUpdateWithoutRelationsDstInput;

  @Field(() => TaskCreateWithoutRelationsDstInput, { nullable: false })
  @Type(() => TaskCreateWithoutRelationsDstInput)
  create!: TaskCreateWithoutRelationsDstInput;

  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;
}
