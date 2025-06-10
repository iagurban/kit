import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskCountAggregateInput } from './user-in-task-count-aggregate.input';
import { UserInTaskMaxAggregateInput } from './user-in-task-max-aggregate.input';
import { UserInTaskMinAggregateInput } from './user-in-task-min-aggregate.input';
import { UserInTaskOrderByWithAggregationInput } from './user-in-task-order-by-with-aggregation.input';
import { UserInTaskScalarFieldEnum } from './user-in-task-scalar-field.enum';
import { UserInTaskScalarWhereWithAggregatesInput } from './user-in-task-scalar-where-with-aggregates.input';
import { UserInTaskWhereInput } from './user-in-task-where.input';

@ArgsType()
export class UserInTaskGroupByArgs {
  @Field(() => UserInTaskWhereInput, { nullable: true })
  @Type(() => UserInTaskWhereInput)
  where?: UserInTaskWhereInput;

  @Field(() => [UserInTaskOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<UserInTaskOrderByWithAggregationInput>;

  @Field(() => [UserInTaskScalarFieldEnum], { nullable: false })
  by!: Array<`${UserInTaskScalarFieldEnum}`>;

  @Field(() => UserInTaskScalarWhereWithAggregatesInput, { nullable: true })
  having?: UserInTaskScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => UserInTaskCountAggregateInput, { nullable: true })
  _count?: UserInTaskCountAggregateInput;

  @Field(() => UserInTaskMinAggregateInput, { nullable: true })
  _min?: UserInTaskMinAggregateInput;

  @Field(() => UserInTaskMaxAggregateInput, { nullable: true })
  _max?: UserInTaskMaxAggregateInput;
}
