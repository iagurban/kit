import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { TaskHistoryKey } from '../prisma/task-history-key.enum';
import { TaskHistoryValueCountAggregate } from './task-history-value-count-aggregate.output';
import { TaskHistoryValueMaxAggregate } from './task-history-value-max-aggregate.output';
import { TaskHistoryValueMinAggregate } from './task-history-value-min-aggregate.output';

@ObjectType()
export class TaskHistoryValueGroupBy {
  @Field(() => String, { nullable: false })
  groupId!: string;

  @Field(() => String, { nullable: false })
  taskId!: string;

  @Field(() => TaskHistoryKey, { nullable: false })
  key!: `${TaskHistoryKey}`;

  @Field(() => GraphQLJSON, { nullable: false })
  value!: any;

  @Field(() => TaskHistoryValueCountAggregate, { nullable: true })
  _count?: TaskHistoryValueCountAggregate;

  @Field(() => TaskHistoryValueMinAggregate, { nullable: true })
  _min?: TaskHistoryValueMinAggregate;

  @Field(() => TaskHistoryValueMaxAggregate, { nullable: true })
  _max?: TaskHistoryValueMaxAggregate;
}
