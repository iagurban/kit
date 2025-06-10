import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskOrderByWithRelationInput } from './user-in-task-order-by-with-relation.input';
import { UserInTaskScalarFieldEnum } from './user-in-task-scalar-field.enum';
import { UserInTaskWhereInput } from './user-in-task-where.input';
import { UserInTaskWhereUniqueInput } from './user-in-task-where-unique.input';

@ArgsType()
export class FindFirstUserInTaskOrThrowArgs {
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

  @Field(() => [UserInTaskScalarFieldEnum], { nullable: true })
  distinct?: Array<`${UserInTaskScalarFieldEnum}`>;
}
