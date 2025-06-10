import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskCountAggregateInput } from './user-in-task-count-aggregate.input';
import { UserInTaskMaxAggregateInput } from './user-in-task-max-aggregate.input';
import { UserInTaskMinAggregateInput } from './user-in-task-min-aggregate.input';
import { UserInTaskOrderByWithRelationInput } from './user-in-task-order-by-with-relation.input';
import { UserInTaskWhereInput } from './user-in-task-where.input';
import { UserInTaskWhereUniqueInput } from './user-in-task-where-unique.input';

@ArgsType()
export class UserInTaskAggregateArgs {
  @Field(() => UserInTaskWhereInput, { nullable: true })
  @Type(() => UserInTaskWhereInput)
  where?: UserInTaskWhereInput;

  @Field(() => [UserInTaskOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<UserInTaskOrderByWithRelationInput>;

  @Field(() => UserInTaskWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<UserInTaskWhereUniqueInput, 'id'>;

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
