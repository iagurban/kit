import { Field, InputType } from '@nestjs/graphql';

import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UserInTaskScalarRelationFilter } from '../user-in-task/user-in-task-scalar-relation-filter.input';

@InputType()
export class UserInTaskTagWhereInput {
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
