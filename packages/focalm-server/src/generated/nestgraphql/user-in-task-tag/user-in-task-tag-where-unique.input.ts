import { Field, InputType } from '@nestjs/graphql';

import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UserInTaskScalarRelationFilter } from '../user-in-task/user-in-task-scalar-relation-filter.input';
import { UserInTaskTagUserInTaskIdTagCompoundUniqueInput } from './user-in-task-tag-user-in-task-id-tag-compound-unique.input';
import { UserInTaskTagWhereInput } from './user-in-task-tag-where.input';

@InputType()
export class UserInTaskTagWhereUniqueInput {
  @Field(() => UserInTaskTagUserInTaskIdTagCompoundUniqueInput, { nullable: true })
  userInTaskId_tag?: UserInTaskTagUserInTaskIdTagCompoundUniqueInput;

  @Field(() => [UserInTaskTagWhereInput], { nullable: true })
  AND?: Array<UserInTaskTagWhereInput>;

  @Field(() => [UserInTaskTagWhereInput], { nullable: true })
  OR?: Array<UserInTaskTagWhereInput>;

  @Field(() => [UserInTaskTagWhereInput], { nullable: true })
  NOT?: Array<UserInTaskTagWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  userInTaskId?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  tag?: StringFilter;

  @Field(() => UserInTaskScalarRelationFilter, { nullable: true })
  userInTask?: UserInTaskScalarRelationFilter;
}
