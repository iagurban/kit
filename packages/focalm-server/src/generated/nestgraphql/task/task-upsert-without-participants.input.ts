import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateWithoutParticipantsInput } from './task-create-without-participants.input';
import { TaskUpdateWithoutParticipantsInput } from './task-update-without-participants.input';
import { TaskWhereInput } from './task-where.input';

@InputType()
export class TaskUpsertWithoutParticipantsInput {
  @Field(() => TaskUpdateWithoutParticipantsInput, { nullable: false })
  @Type(() => TaskUpdateWithoutParticipantsInput)
  update!: TaskUpdateWithoutParticipantsInput;

  @Field(() => TaskCreateWithoutParticipantsInput, { nullable: false })
  @Type(() => TaskCreateWithoutParticipantsInput)
  create!: TaskCreateWithoutParticipantsInput;

  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;
}
