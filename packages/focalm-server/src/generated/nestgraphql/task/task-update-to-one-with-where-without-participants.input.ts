import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskUpdateWithoutParticipantsInput } from './task-update-without-participants.input';
import { TaskWhereInput } from './task-where.input';

@InputType()
export class TaskUpdateToOneWithWhereWithoutParticipantsInput {
  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;

  @Field(() => TaskUpdateWithoutParticipantsInput, { nullable: false })
  @Type(() => TaskUpdateWithoutParticipantsInput)
  data!: TaskUpdateWithoutParticipantsInput;
}
