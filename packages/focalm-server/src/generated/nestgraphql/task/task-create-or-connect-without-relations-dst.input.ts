import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateWithoutRelationsDstInput } from './task-create-without-relations-dst.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskCreateOrConnectWithoutRelationsDstInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskCreateWithoutRelationsDstInput, { nullable: false })
  @Type(() => TaskCreateWithoutRelationsDstInput)
  create!: TaskCreateWithoutRelationsDstInput;
}
