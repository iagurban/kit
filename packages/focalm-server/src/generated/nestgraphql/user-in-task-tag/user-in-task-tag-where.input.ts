import { Field, InputType } from '@nestjs/graphql';

import { ParticipantRoleScalarRelationFilter } from '../participant-role/participant-role-scalar-relation-filter.input';
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

  @Field(() => UuidFilter, { nullable: true })
  roleId?: UuidFilter;

  @Field(() => UserInTaskScalarRelationFilter, { nullable: true })
  userInTask?: UserInTaskScalarRelationFilter;

  @Field(() => ParticipantRoleScalarRelationFilter, { nullable: true })
  role?: ParticipantRoleScalarRelationFilter;
}
