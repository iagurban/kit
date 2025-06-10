import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskCreateWithoutUserInput } from './user-in-task-create-without-user.input';
import { UserInTaskUpdateWithoutUserInput } from './user-in-task-update-without-user.input';
import { UserInTaskWhereUniqueInput } from './user-in-task-where-unique.input';

@InputType()
export class UserInTaskUpsertWithWhereUniqueWithoutUserInput {
  @Field(() => UserInTaskWhereUniqueInput, { nullable: false })
  @Type(() => UserInTaskWhereUniqueInput)
  where!: Prisma.AtLeast<UserInTaskWhereUniqueInput, 'id'>;

  @Field(() => UserInTaskUpdateWithoutUserInput, { nullable: false })
  @Type(() => UserInTaskUpdateWithoutUserInput)
  update!: UserInTaskUpdateWithoutUserInput;

  @Field(() => UserInTaskCreateWithoutUserInput, { nullable: false })
  @Type(() => UserInTaskCreateWithoutUserInput)
  create!: UserInTaskCreateWithoutUserInput;
}
