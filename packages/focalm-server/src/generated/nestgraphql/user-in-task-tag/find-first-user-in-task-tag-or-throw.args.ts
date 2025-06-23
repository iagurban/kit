import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskTagOrderByWithRelationInput } from './user-in-task-tag-order-by-with-relation.input';
import { UserInTaskTagScalarFieldEnum } from './user-in-task-tag-scalar-field.enum';
import { UserInTaskTagWhereInput } from './user-in-task-tag-where.input';
import { UserInTaskTagWhereUniqueInput } from './user-in-task-tag-where-unique.input';

@ArgsType()
export class FindFirstUserInTaskTagOrThrowArgs {
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

  @Field(() => [UserInTaskTagScalarFieldEnum], { nullable: true })
  distinct?: Array<`${UserInTaskTagScalarFieldEnum}`>;
}
