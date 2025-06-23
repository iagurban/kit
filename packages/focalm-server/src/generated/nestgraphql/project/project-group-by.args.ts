import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProjectAvgAggregateInput } from './project-avg-aggregate.input';
import { ProjectCountAggregateInput } from './project-count-aggregate.input';
import { ProjectMaxAggregateInput } from './project-max-aggregate.input';
import { ProjectMinAggregateInput } from './project-min-aggregate.input';
import { ProjectOrderByWithAggregationInput } from './project-order-by-with-aggregation.input';
import { ProjectScalarFieldEnum } from './project-scalar-field.enum';
import { ProjectScalarWhereWithAggregatesInput } from './project-scalar-where-with-aggregates.input';
import { ProjectSumAggregateInput } from './project-sum-aggregate.input';
import { ProjectWhereInput } from './project-where.input';

@ArgsType()
export class ProjectGroupByArgs {
  @Field(() => ProjectWhereInput, { nullable: true })
  @Type(() => ProjectWhereInput)
  where?: ProjectWhereInput;

  @Field(() => [ProjectOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<ProjectOrderByWithAggregationInput>;

  @Field(() => [ProjectScalarFieldEnum], { nullable: false })
  by!: Array<`${ProjectScalarFieldEnum}`>;

  @Field(() => ProjectScalarWhereWithAggregatesInput, { nullable: true })
  having?: ProjectScalarWhereWithAggregatesInput;

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
