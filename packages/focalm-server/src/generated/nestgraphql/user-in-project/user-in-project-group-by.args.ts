import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInProjectCountAggregateInput } from './user-in-project-count-aggregate.input';
import { UserInProjectMaxAggregateInput } from './user-in-project-max-aggregate.input';
import { UserInProjectMinAggregateInput } from './user-in-project-min-aggregate.input';
import { UserInProjectOrderByWithAggregationInput } from './user-in-project-order-by-with-aggregation.input';
import { UserInProjectScalarFieldEnum } from './user-in-project-scalar-field.enum';
import { UserInProjectScalarWhereWithAggregatesInput } from './user-in-project-scalar-where-with-aggregates.input';
import { UserInProjectWhereInput } from './user-in-project-where.input';

@ArgsType()
export class UserInProjectGroupByArgs {
  @Field(() => UserInProjectWhereInput, { nullable: true })
  @Type(() => UserInProjectWhereInput)
  where?: UserInProjectWhereInput;

  @Field(() => [UserInProjectOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<UserInProjectOrderByWithAggregationInput>;

  @Field(() => [UserInProjectScalarFieldEnum], { nullable: false })
  by!: Array<`${UserInProjectScalarFieldEnum}`>;

  @Field(() => UserInProjectScalarWhereWithAggregatesInput, { nullable: true })
  having?: UserInProjectScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => UserInProjectCountAggregateInput, { nullable: true })
  _count?: UserInProjectCountAggregateInput;

  @Field(() => UserInProjectMinAggregateInput, { nullable: true })
  _min?: UserInProjectMinAggregateInput;

  @Field(() => UserInProjectMaxAggregateInput, { nullable: true })
  _max?: UserInProjectMaxAggregateInput;
}
