import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateWithoutParticipatingTasksInput } from './user-create-without-participating-tasks.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutParticipatingTasksInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name' | 'ownProjectId'>;

  @Field(() => UserCreateWithoutParticipatingTasksInput, { nullable: false })
  @Type(() => UserCreateWithoutParticipatingTasksInput)
  create!: UserCreateWithoutParticipatingTasksInput;
}
