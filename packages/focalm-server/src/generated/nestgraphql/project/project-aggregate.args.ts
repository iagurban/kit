import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ProjectAvgAggregateInput } from './project-avg-aggregate.input';
import { ProjectCountAggregateInput } from './project-count-aggregate.input';
import { ProjectMaxAggregateInput } from './project-max-aggregate.input';
import { ProjectMinAggregateInput } from './project-min-aggregate.input';
import { ProjectOrderByWithRelationInput } from './project-order-by-with-relation.input';
import { ProjectSumAggregateInput } from './project-sum-aggregate.input';
import { ProjectWhereInput } from './project-where.input';
import { ProjectWhereUniqueInput } from './project-where-unique.input';

@ArgsType()
export class ProjectAggregateArgs {
  @Field(() => ProjectWhereInput, { nullable: true })
  @Type(() => ProjectWhereInput)
  where?: ProjectWhereInput;

  @Field(() => [ProjectOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<ProjectOrderByWithRelationInput>;

  @Field(() => ProjectWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => ProjectCountAggregateInput, { nullable: true })
  _count?: ProjectCountAggregateInput;

  @Field(() => ProjectAvgAggregateInput, { nullable: true })
  _avg?: ProjectAvgAggregateInput;

  @Field(() => ProjectSumAggregateInput, { nullable: true })
  _sum?: ProjectSumAggregateInput;

  @Field(() => ProjectMinAggregateInput, { nullable: true })
  _min?: ProjectMinAggregateInput;

  @Field(() => ProjectMaxAggregateInput, { nullable: true })
  _max?: ProjectMaxAggregateInput;
}
