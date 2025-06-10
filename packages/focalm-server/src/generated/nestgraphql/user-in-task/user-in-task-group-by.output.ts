import { Field, ObjectType } from '@nestjs/graphql';

import { UserInTaskCountAggregate } from './user-in-task-count-aggregate.output';
import { UserInTaskMaxAggregate } from './user-in-task-max-aggregate.output';
import { UserInTaskMinAggregate } from './user-in-task-min-aggregate.output';

@ObjectType()
export class UserInTaskGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  taskId!: string;

  @Field(() => UserInTaskCountAggregate, { nullable: true })
  _count?: UserInTaskCountAggregate;

  @Field(() => UserInTaskMinAggregate, { nullable: true })
  _min?: UserInTaskMinAggregate;

  @Field(() => UserInTaskMaxAggregate, { nullable: true })
  _max?: UserInTaskMaxAggregate;
}
