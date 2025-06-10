import { Field, ObjectType } from '@nestjs/graphql';

import { UserInTaskTagCountAggregate } from './user-in-task-tag-count-aggregate.output';
import { UserInTaskTagMaxAggregate } from './user-in-task-tag-max-aggregate.output';
import { UserInTaskTagMinAggregate } from './user-in-task-tag-min-aggregate.output';

@ObjectType()
export class AggregateUserInTaskTag {
  @Field(() => UserInTaskTagCountAggregate, { nullable: true })
  _count?: UserInTaskTagCountAggregate;

  @Field(() => UserInTaskTagMinAggregate, { nullable: true })
  _min?: UserInTaskTagMinAggregate;

  @Field(() => UserInTaskTagMaxAggregate, { nullable: true })
  _max?: UserInTaskTagMaxAggregate;
}
