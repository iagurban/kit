import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateOrConnectWithoutParticipatingTasksInput } from './user-create-or-connect-without-participating-tasks.input';
import { UserCreateWithoutParticipatingTasksInput } from './user-create-without-participating-tasks.input';
import { UserUpdateToOneWithWhereWithoutParticipatingTasksInput } from './user-update-to-one-with-where-without-participating-tasks.input';
import { UserUpsertWithoutParticipatingTasksInput } from './user-upsert-without-participating-tasks.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateOneRequiredWithoutParticipatingTasksNestedInput {
  @Field(() => UserCreateWithoutParticipatingTasksInput, { nullable: true })
  @Type(() => UserCreateWithoutParticipatingTasksInput)
  create?: UserCreateWithoutParticipatingTasksInput;

  @Field(() => UserCreateOrConnectWithoutParticipatingTasksInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutParticipatingTasksInput)
  connectOrCreate?: UserCreateOrConnectWithoutParticipatingTasksInput;

  @Field(() => UserUpsertWithoutParticipatingTasksInput, { nullable: true })
  @Type(() => UserUpsertWithoutParticipatingTasksInput)
  upsert?: UserUpsertWithoutParticipatingTasksInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

  @Field(() => UserUpdateToOneWithWhereWithoutParticipatingTasksInput, { nullable: true })
  @Type(() => UserUpdateToOneWithWhereWithoutParticipatingTasksInput)
  update?: UserUpdateToOneWithWhereWithoutParticipatingTasksInput;
}
