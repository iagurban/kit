import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskCreateManyUserInputEnvelope } from './user-in-task-create-many-user-input-envelope.input';
import { UserInTaskCreateOrConnectWithoutUserInput } from './user-in-task-create-or-connect-without-user.input';
import { UserInTaskCreateWithoutUserInput } from './user-in-task-create-without-user.input';
import { UserInTaskWhereUniqueInput } from './user-in-task-where-unique.input';

@InputType()
export class UserInTaskUncheckedCreateNestedManyWithoutUserInput {
  @Field(() => [UserInTaskCreateWithoutUserInput], { nullable: true })
  @Type(() => UserInTaskCreateWithoutUserInput)
  create?: Array<UserInTaskCreateWithoutUserInput>;

  @Field(() => [UserInTaskCreateOrConnectWithoutUserInput], { nullable: true })
  @Type(() => UserInTaskCreateOrConnectWithoutUserInput)
  connectOrCreate?: Array<UserInTaskCreateOrConnectWithoutUserInput>;

  @Field(() => UserInTaskCreateManyUserInputEnvelope, { nullable: true })
  @Type(() => UserInTaskCreateManyUserInputEnvelope)
  createMany?: UserInTaskCreateManyUserInputEnvelope;

  @Field(() => [UserInTaskWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserInTaskWhereUniqueInput, 'id'>>;
}
