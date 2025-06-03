import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateWithoutAssignedTasksInput } from './user-create-without-assigned-tasks.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutAssignedTasksInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

  @Field(() => UserCreateWithoutAssignedTasksInput, { nullable: false })
  @Type(() => UserCreateWithoutAssignedTasksInput)
  create!: UserCreateWithoutAssignedTasksInput;
}
