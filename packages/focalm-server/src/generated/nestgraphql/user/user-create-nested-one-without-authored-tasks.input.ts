import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateOrConnectWithoutAuthoredTasksInput } from './user-create-or-connect-without-authored-tasks.input';
import { UserCreateWithoutAuthoredTasksInput } from './user-create-without-authored-tasks.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutAuthoredTasksInput {
  @Field(() => UserCreateWithoutAuthoredTasksInput, { nullable: true })
  @Type(() => UserCreateWithoutAuthoredTasksInput)
  create?: UserCreateWithoutAuthoredTasksInput;

  @Field(() => UserCreateOrConnectWithoutAuthoredTasksInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutAuthoredTasksInput)
  connectOrCreate?: UserCreateOrConnectWithoutAuthoredTasksInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name' | 'ownProjectId'>;
}
