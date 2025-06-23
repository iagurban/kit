import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInProjectOrderByWithRelationInput } from './user-in-project-order-by-with-relation.input';
import { UserInProjectScalarFieldEnum } from './user-in-project-scalar-field.enum';
import { UserInProjectWhereInput } from './user-in-project-where.input';
import { UserInProjectWhereUniqueInput } from './user-in-project-where-unique.input';

@ArgsType()
export class FindManyUserInProjectArgs {
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

  @Field(() => [UserInProjectScalarFieldEnum], { nullable: true })
  distinct?: Array<`${UserInProjectScalarFieldEnum}`>;
}
