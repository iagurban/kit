import { Field, Float, InputType } from '@nestjs/graphql';

import { TaskState } from '../prisma/task-state.enum';

@InputType()
export class TaskCreateManyResponsibleInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => TaskState, { nullable: true })
  state?: `${TaskState}`;

  @Field(() => Boolean, { nullable: true })
  archived?: boolean;

  @Field(() => Float, { nullable: true })
  impact?: number;

  @Field(() => Float, { nullable: true })
  ease?: number;

  @Field(() => Date, { nullable: true })
  startAfter?: Date | string;

  @Field(() => Date, { nullable: true })
  plannedStart?: Date | string;

  @Field(() => Date, { nullable: true })
  dueTo?: Date | string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => String, { nullable: true })
  parentId?: string;

  @Field(() => String, { nullable: false })
  orderKey!: string;
}
