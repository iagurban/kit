import { Field, ObjectType } from '@nestjs/graphql';

import { ProjectAvgAggregate } from './project-avg-aggregate.output';
import { ProjectCountAggregate } from './project-count-aggregate.output';
import { ProjectMaxAggregate } from './project-max-aggregate.output';
import { ProjectMinAggregate } from './project-min-aggregate.output';
import { ProjectSumAggregate } from './project-sum-aggregate.output';

@ObjectType()
export class AggregateProject {
  @Field(() => ProjectCountAggregate, { nullable: true })
  _count?: ProjectCountAggregate;

  @Field(() => ProjectAvgAggregate, { nullable: true })
  _avg?: ProjectAvgAggregate;

  @Field(() => ProjectSumAggregate, { nullable: true })
  _sum?: ProjectSumAggregate;

  @Field(() => ProjectMinAggregate, { nullable: true })
  _min?: ProjectMinAggregate;

  @Field(() => ProjectMaxAggregate, { nullable: true })
  _max?: ProjectMaxAggregate;
}
