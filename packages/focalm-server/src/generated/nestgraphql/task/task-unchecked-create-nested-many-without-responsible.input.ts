import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateManyResponsibleInputEnvelope } from './task-create-many-responsible-input-envelope.input';
import { TaskCreateOrConnectWithoutResponsibleInput } from './task-create-or-connect-without-responsible.input';
import { TaskCreateWithoutResponsibleInput } from './task-create-without-responsible.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUncheckedCreateNestedManyWithoutResponsibleInput {
  @Field(() => [TaskCreateWithoutResponsibleInput], { nullable: true })
  @Type(() => TaskCreateWithoutResponsibleInput)
  create?: Array<TaskCreateWithoutResponsibleInput>;

  @Field(() => [TaskCreateOrConnectWithoutResponsibleInput], { nullable: true })
  @Type(() => TaskCreateOrConnectWithoutResponsibleInput)
  connectOrCreate?: Array<TaskCreateOrConnectWithoutResponsibleInput>;

  @Field(() => TaskCreateManyResponsibleInputEnvelope, { nullable: true })
  @Type(() => TaskCreateManyResponsibleInputEnvelope)
  createMany?: TaskCreateManyResponsibleInputEnvelope;

  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskWhereUniqueInput, 'id'>>;
}
