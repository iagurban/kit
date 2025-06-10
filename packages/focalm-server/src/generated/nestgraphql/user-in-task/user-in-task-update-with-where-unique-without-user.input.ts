import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskUpdateWithoutUserInput } from './user-in-task-update-without-user.input';
import { UserInTaskWhereUniqueInput } from './user-in-task-where-unique.input';

@InputType()
export class UserInTaskUpdateWithWhereUniqueWithoutUserInput {
  @Field(() => UserInTaskWhereUniqueInput, { nullable: false })
  @Type(() => UserInTaskWhereUniqueInput)
  where!: Prisma.AtLeast<UserInTaskWhereUniqueInput, 'id'>;

  @Field(() => UserInTaskUpdateWithoutUserInput, { nullable: false })
  @Type(() => UserInTaskUpdateWithoutUserInput)
  data!: UserInTaskUpdateWithoutUserInput;
}
