import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateWithoutParticipantsInput } from './task-create-without-participants.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskCreateOrConnectWithoutParticipantsInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskCreateWithoutParticipantsInput, { nullable: false })
  @Type(() => TaskCreateWithoutParticipantsInput)
  create!: TaskCreateWithoutParticipantsInput;
}
