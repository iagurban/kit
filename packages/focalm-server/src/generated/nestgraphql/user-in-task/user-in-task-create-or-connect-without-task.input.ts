import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskCreateWithoutTaskInput } from './user-in-task-create-without-task.input';
import { UserInTaskWhereUniqueInput } from './user-in-task-where-unique.input';

@InputType()
export class UserInTaskCreateOrConnectWithoutTaskInput {
  @Field(() => UserInTaskWhereUniqueInput, { nullable: false })
  @Type(() => UserInTaskWhereUniqueInput)
  where!: Prisma.AtLeast<UserInTaskWhereUniqueInput, 'id'>;

  @Field(() => UserInTaskCreateWithoutTaskInput, { nullable: false })
  @Type(() => UserInTaskCreateWithoutTaskInput)
  create!: UserInTaskCreateWithoutTaskInput;
}
