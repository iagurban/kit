import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInProjectUpdateWithoutUserInput } from './user-in-project-update-without-user.input';
import { UserInProjectWhereUniqueInput } from './user-in-project-where-unique.input';

@InputType()
export class UserInProjectUpdateWithWhereUniqueWithoutUserInput {
  @Field(() => UserInProjectWhereUniqueInput, { nullable: false })
  @Type(() => UserInProjectWhereUniqueInput)
  where!: Prisma.AtLeast<UserInProjectWhereUniqueInput, 'userId_projectId_permission_kind'>;

  @Field(() => UserInProjectUpdateWithoutUserInput, { nullable: false })
  @Type(() => UserInProjectUpdateWithoutUserInput)
  data!: UserInProjectUpdateWithoutUserInput;
}
