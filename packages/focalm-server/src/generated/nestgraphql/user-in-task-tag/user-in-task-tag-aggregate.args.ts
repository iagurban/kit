import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskTagCountAggregateInput } from './user-in-task-tag-count-aggregate.input';
import { UserInTaskTagMaxAggregateInput } from './user-in-task-tag-max-aggregate.input';
import { UserInTaskTagMinAggregateInput } from './user-in-task-tag-min-aggregate.input';
import { UserInTaskTagOrderByWithRelationInput } from './user-in-task-tag-order-by-with-relation.input';
import { UserInTaskTagWhereInput } from './user-in-task-tag-where.input';
import { UserInTaskTagWhereUniqueInput } from './user-in-task-tag-where-unique.input';

@ArgsType()
export class UserInTaskTagAggregateArgs {
  @Field(() => UserInTaskTagWhereInput, { nullable: true })
  @Type(() => UserInTaskTagWhereInput)
  where?: UserInTaskTagWhereInput;

  @Field(() => [UserInTaskTagOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<UserInTaskTagOrderByWithRelationInput>;

  @Field(() => UserInTaskTagWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_roleId'>;

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
