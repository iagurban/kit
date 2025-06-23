import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateOrConnectWithoutAuthoredTaskChangesInput } from './user-create-or-connect-without-authored-task-changes.input';
import { UserCreateWithoutAuthoredTaskChangesInput } from './user-create-without-authored-task-changes.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutAuthoredTaskChangesInput {
  @Field(() => UserCreateWithoutAuthoredTaskChangesInput, { nullable: true })
  @Type(() => UserCreateWithoutAuthoredTaskChangesInput)
  create?: UserCreateWithoutAuthoredTaskChangesInput;

  @Field(() => UserCreateOrConnectWithoutAuthoredTaskChangesInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutAuthoredTaskChangesInput)
  connectOrCreate?: UserCreateOrConnectWithoutAuthoredTaskChangesInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name' | 'ownProjectId'>;
}
