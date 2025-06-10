import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskTagCountAggregateInput } from './user-in-task-tag-count-aggregate.input';
import { UserInTaskTagMaxAggregateInput } from './user-in-task-tag-max-aggregate.input';
import { UserInTaskTagMinAggregateInput } from './user-in-task-tag-min-aggregate.input';
import { UserInTaskTagOrderByWithAggregationInput } from './user-in-task-tag-order-by-with-aggregation.input';
import { UserInTaskTagScalarFieldEnum } from './user-in-task-tag-scalar-field.enum';
import { UserInTaskTagScalarWhereWithAggregatesInput } from './user-in-task-tag-scalar-where-with-aggregates.input';
import { UserInTaskTagWhereInput } from './user-in-task-tag-where.input';

@ArgsType()
export class UserInTaskTagGroupByArgs {
  @Field(() => UserInTaskTagWhereInput, { nullable: true })
  @Type(() => UserInTaskTagWhereInput)
  where?: UserInTaskTagWhereInput;

  @Field(() => [UserInTaskTagOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<UserInTaskTagOrderByWithAggregationInput>;

  @Field(() => [UserInTaskTagScalarFieldEnum], { nullable: false })
  by!: Array<`${UserInTaskTagScalarFieldEnum}`>;

  @Field(() => UserInTaskTagScalarWhereWithAggregatesInput, { nullable: true })
  having?: UserInTaskTagScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => UserInTaskTagCountAggregateInput, { nullable: true })
  _count?: UserInTaskTagCountAggregateInput;

  @Field(() => UserInTaskTagMinAggregateInput, { nullable: true })
  _min?: UserInTaskTagMinAggregateInput;

  @Field(() => UserInTaskTagMaxAggregateInput, { nullable: true })
  _max?: UserInTaskTagMaxAggregateInput;
}
