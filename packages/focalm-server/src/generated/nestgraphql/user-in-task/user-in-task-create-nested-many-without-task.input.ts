import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskCreateManyTaskInputEnvelope } from './user-in-task-create-many-task-input-envelope.input';
import { UserInTaskCreateOrConnectWithoutTaskInput } from './user-in-task-create-or-connect-without-task.input';
import { UserInTaskCreateWithoutTaskInput } from './user-in-task-create-without-task.input';
import { UserInTaskWhereUniqueInput } from './user-in-task-where-unique.input';

@InputType()
export class UserInTaskCreateNestedManyWithoutTaskInput {
  @Field(() => [UserInTaskCreateWithoutTaskInput], { nullable: true })
  @Type(() => UserInTaskCreateWithoutTaskInput)
  create?: Array<UserInTaskCreateWithoutTaskInput>;

  @Field(() => [UserInTaskCreateOrConnectWithoutTaskInput], { nullable: true })
  @Type(() => UserInTaskCreateOrConnectWithoutTaskInput)
  connectOrCreate?: Array<UserInTaskCreateOrConnectWithoutTaskInput>;

  @Field(() => UserInTaskCreateManyTaskInputEnvelope, { nullable: true })
  @Type(() => UserInTaskCreateManyTaskInputEnvelope)
  createMany?: UserInTaskCreateManyTaskInputEnvelope;

  @Field(() => [UserInTaskWhereUniqueInput], { nullable: true })
  @Type(() => UserInTaskWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UserInTaskWhereUniqueInput, 'id'>>;
}
