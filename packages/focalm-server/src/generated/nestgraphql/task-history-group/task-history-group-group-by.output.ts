import { Field, ObjectType } from '@nestjs/graphql';

import { CreatedAtFixReason } from '../prisma/created-at-fix-reason.enum';
import { TaskHistoryGroupCountAggregate } from './task-history-group-count-aggregate.output';
import { TaskHistoryGroupMaxAggregate } from './task-history-group-max-aggregate.output';
import { TaskHistoryGroupMinAggregate } from './task-history-group-min-aggregate.output';

@ObjectType()
export class TaskHistoryGroupGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  taskId!: string;

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => Date, { nullable: false })
  localCreatedAt!: Date | string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => CreatedAtFixReason, { nullable: true })
  createdAtFixReason?: `${CreatedAtFixReason}`;

  @Field(() => TaskHistoryGroupCountAggregate, { nullable: true })
  _count?: TaskHistoryGroupCountAggregate;

  @Field(() => TaskHistoryGroupMinAggregate, { nullable: true })
  _min?: TaskHistoryGroupMinAggregate;

  @Field(() => TaskHistoryGroupMaxAggregate, { nullable: true })
  _max?: TaskHistoryGroupMaxAggregate;
}
