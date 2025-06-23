import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateWithoutRelationsSrcInput } from './task-create-without-relations-src.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskCreateOrConnectWithoutRelationsSrcInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskCreateWithoutRelationsSrcInput, { nullable: false })
  @Type(() => TaskCreateWithoutRelationsSrcInput)
  create!: TaskCreateWithoutRelationsSrcInput;
}
