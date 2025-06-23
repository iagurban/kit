import { Field, ObjectType } from '@nestjs/graphql';

import { UserInProjectCountAggregate } from './user-in-project-count-aggregate.output';
import { UserInProjectMaxAggregate } from './user-in-project-max-aggregate.output';
import { UserInProjectMinAggregate } from './user-in-project-min-aggregate.output';

@ObjectType()
export class AggregateUserInProject {
  @Field(() => UserInProjectCountAggregate, { nullable: true })
  _count?: UserInProjectCountAggregate;

  @Field(() => UserInProjectMinAggregate, { nullable: true })
  _min?: UserInProjectMinAggregate;

  @Field(() => UserInProjectMaxAggregate, { nullable: true })
  _max?: UserInProjectMaxAggregate;
}
