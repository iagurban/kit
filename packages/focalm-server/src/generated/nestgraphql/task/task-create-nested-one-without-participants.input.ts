import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateOrConnectWithoutParticipantsInput } from './task-create-or-connect-without-participants.input';
import { TaskCreateWithoutParticipantsInput } from './task-create-without-participants.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskCreateNestedOneWithoutParticipantsInput {
  @Field(() => TaskCreateWithoutParticipantsInput, { nullable: true })
  @Type(() => TaskCreateWithoutParticipantsInput)
  create?: TaskCreateWithoutParticipantsInput;

  @Field(() => TaskCreateOrConnectWithoutParticipantsInput, { nullable: true })
  @Type(() => TaskCreateOrConnectWithoutParticipantsInput)
  connectOrCreate?: TaskCreateOrConnectWithoutParticipantsInput;

  @Field(() => TaskWhereUniqueInput, { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;
}
