import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateManyAuthorInputEnvelope } from './task-create-many-author-input-envelope.input';
import { TaskCreateOrConnectWithoutAuthorInput } from './task-create-or-connect-without-author.input';
import { TaskCreateWithoutAuthorInput } from './task-create-without-author.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskCreateNestedManyWithoutAuthorInput {
  @Field(() => [TaskCreateWithoutAuthorInput], { nullable: true })
  @Type(() => TaskCreateWithoutAuthorInput)
  create?: Array<TaskCreateWithoutAuthorInput>;

  @Field(() => [TaskCreateOrConnectWithoutAuthorInput], { nullable: true })
  @Type(() => TaskCreateOrConnectWithoutAuthorInput)
  connectOrCreate?: Array<TaskCreateOrConnectWithoutAuthorInput>;

  @Field(() => TaskCreateManyAuthorInputEnvelope, { nullable: true })
  @Type(() => TaskCreateManyAuthorInputEnvelope)
  createMany?: TaskCreateManyAuthorInputEnvelope;

  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskWhereUniqueInput, 'id'>>;
}
