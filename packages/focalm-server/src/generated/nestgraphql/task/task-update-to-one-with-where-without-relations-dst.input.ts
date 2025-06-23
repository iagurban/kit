import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskUpdateWithoutRelationsDstInput } from './task-update-without-relations-dst.input';
import { TaskWhereInput } from './task-where.input';

@InputType()
export class TaskUpdateToOneWithWhereWithoutRelationsDstInput {
  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;

  @Field(() => TaskUpdateWithoutRelationsDstInput, { nullable: false })
  @Type(() => TaskUpdateWithoutRelationsDstInput)
  data!: TaskUpdateWithoutRelationsDstInput;
}
