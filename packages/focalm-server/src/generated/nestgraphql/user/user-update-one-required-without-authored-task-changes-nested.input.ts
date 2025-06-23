import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateOrConnectWithoutAuthoredTaskChangesInput } from './user-create-or-connect-without-authored-task-changes.input';
import { UserCreateWithoutAuthoredTaskChangesInput } from './user-create-without-authored-task-changes.input';
import { UserUpdateToOneWithWhereWithoutAuthoredTaskChangesInput } from './user-update-to-one-with-where-without-authored-task-changes.input';
import { UserUpsertWithoutAuthoredTaskChangesInput } from './user-upsert-without-authored-task-changes.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateOneRequiredWithoutAuthoredTaskChangesNestedInput {
  @Field(() => UserCreateWithoutAuthoredTaskChangesInput, { nullable: true })
  @Type(() => UserCreateWithoutAuthoredTaskChangesInput)
  create?: UserCreateWithoutAuthoredTaskChangesInput;

  @Field(() => UserCreateOrConnectWithoutAuthoredTaskChangesInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutAuthoredTaskChangesInput)
  connectOrCreate?: UserCreateOrConnectWithoutAuthoredTaskChangesInput;

  @Field(() => UserUpsertWithoutAuthoredTaskChangesInput, { nullable: true })
  @Type(() => UserUpsertWithoutAuthoredTaskChangesInput)
  upsert?: UserUpsertWithoutAuthoredTaskChangesInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name' | 'ownProjectId'>;

  @Field(() => UserUpdateToOneWithWhereWithoutAuthoredTaskChangesInput, { nullable: true })
  @Type(() => UserUpdateToOneWithWhereWithoutAuthoredTaskChangesInput)
  update?: UserUpdateToOneWithWhereWithoutAuthoredTaskChangesInput;
}
