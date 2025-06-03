import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

import { TaskState } from '../prisma/task-state.enum';
import { TaskHistoryGroup } from '../task-history-group/task-history-group.model';
import { User } from '../user/user.model';
import { TaskCount } from './task-count.output';

@ObjectType()
export class Task {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => TaskState, { defaultValue: 'Pending', nullable: false })
  state!: `${TaskState}`;

  @Field(() => Boolean, { defaultValue: false, nullable: false })
  archived!: boolean;

  @Field(() => Float, { defaultValue: 0.5, nullable: false })
  impact!: number;

  @Field(() => Float, { defaultValue: 0.5, nullable: false })
  ease!: number;

  @Field(() => Date, { nullable: true })
  startAfter!: Date | null;

  @Field(() => Date, { nullable: true })
  plannedStart!: Date | null;

  @Field(() => Date, { nullable: true })
  dueTo!: Date | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => String, { nullable: true })
  responsibleId!: string | null;

  @Field(() => String, { nullable: true })
  parentId!: string | null;

  @Field(() => String, { nullable: false })
  orderKey!: string;

  @Field(() => User, { nullable: false })
  author?: User;

  @Field(() => User, { nullable: true })
  responsible?: User | null;

  @Field(() => Task, { nullable: true })
  parent?: Task | null;

  @Field(() => [Task], { nullable: true })
  children?: Array<Task>;

  @Field(() => [TaskHistoryGroup], { nullable: true })
  historyGroups?: Array<TaskHistoryGroup>;

  @Field(() => TaskCount, { nullable: false })
  _count?: TaskCount;
}
