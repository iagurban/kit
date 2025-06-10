import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateOrConnectWithoutParticipantsInput } from './task-create-or-connect-without-participants.input';
import { TaskCreateWithoutParticipantsInput } from './task-create-without-participants.input';
import { TaskUpdateToOneWithWhereWithoutParticipantsInput } from './task-update-to-one-with-where-without-participants.input';
import { TaskUpsertWithoutParticipantsInput } from './task-upsert-without-participants.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpdateOneRequiredWithoutParticipantsNestedInput {
  @Field(() => TaskCreateWithoutParticipantsInput, { nullable: true })
  @Type(() => TaskCreateWithoutParticipantsInput)
  create?: TaskCreateWithoutParticipantsInput;

  @Field(() => TaskCreateOrConnectWithoutParticipantsInput, { nullable: true })
  @Type(() => TaskCreateOrConnectWithoutParticipantsInput)
  connectOrCreate?: TaskCreateOrConnectWithoutParticipantsInput;

  @Field(() => TaskUpsertWithoutParticipantsInput, { nullable: true })
  @Type(() => TaskUpsertWithoutParticipantsInput)
  upsert?: TaskUpsertWithoutParticipantsInput;

  @Field(() => TaskWhereUniqueInput, { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskUpdateToOneWithWhereWithoutParticipantsInput, { nullable: true })
  @Type(() => TaskUpdateToOneWithWhereWithoutParticipantsInput)
  update?: TaskUpdateToOneWithWhereWithoutParticipantsInput;
}
