import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInProjectCountAggregateInput } from './user-in-project-count-aggregate.input';
import { UserInProjectMaxAggregateInput } from './user-in-project-max-aggregate.input';
import { UserInProjectMinAggregateInput } from './user-in-project-min-aggregate.input';
import { UserInProjectOrderByWithRelationInput } from './user-in-project-order-by-with-relation.input';
import { UserInProjectWhereInput } from './user-in-project-where.input';
import { UserInProjectWhereUniqueInput } from './user-in-project-where-unique.input';

@ArgsType()
export class UserInProjectAggregateArgs {
  @Field(() => UserInProjectWhereInput, { nullable: true })
  @Type(() => UserInProjectWhereInput)
  where?: UserInProjectWhereInput;

  @Field(() => [UserInProjectOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<UserInProjectOrderByWithRelationInput>;

  @Field(() => UserInProjectWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<UserInProjectWhereUniqueInput, 'userId_projectId_permission_kind'>;

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
