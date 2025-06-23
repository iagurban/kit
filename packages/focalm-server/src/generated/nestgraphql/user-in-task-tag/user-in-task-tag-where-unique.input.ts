import { Field, InputType } from '@nestjs/graphql';

import { ParticipantRoleScalarRelationFilter } from '../participant-role/participant-role-scalar-relation-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UserInTaskScalarRelationFilter } from '../user-in-task/user-in-task-scalar-relation-filter.input';
import { UserInTaskTagUserInTaskIdRoleIdCompoundUniqueInput } from './user-in-task-tag-user-in-task-id-role-id-compound-unique.input';
import { UserInTaskTagWhereInput } from './user-in-task-tag-where.input';

@InputType()
export class UserInTaskTagWhereUniqueInput {
  @Field(() => UserInTaskTagUserInTaskIdRoleIdCompoundUniqueInput, { nullable: true })
  userInTaskId_roleId?: UserInTaskTagUserInTaskIdRoleIdCompoundUniqueInput;

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
