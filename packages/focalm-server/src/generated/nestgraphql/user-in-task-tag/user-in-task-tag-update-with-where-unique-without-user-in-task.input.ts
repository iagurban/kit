import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskTagUpdateWithoutUserInTaskInput } from './user-in-task-tag-update-without-user-in-task.input';
import { UserInTaskTagWhereUniqueInput } from './user-in-task-tag-where-unique.input';

@InputType()
export class UserInTaskTagUpdateWithWhereUniqueWithoutUserInTaskInput {
  @Field(() => UserInTaskTagWhereUniqueInput, { nullable: false })
  @Type(() => UserInTaskTagWhereUniqueInput)
  where!: Prisma.AtLeast<UserInTaskTagWhereUniqueInput, 'userInTaskId_tag'>;

  @Field(() => UserInTaskTagUpdateWithoutUserInTaskInput, { nullable: false })
  @Type(() => UserInTaskTagUpdateWithoutUserInTaskInput)
  data!: UserInTaskTagUpdateWithoutUserInTaskInput;
}
