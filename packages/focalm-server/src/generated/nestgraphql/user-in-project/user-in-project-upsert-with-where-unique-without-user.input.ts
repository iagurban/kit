import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInProjectCreateWithoutUserInput } from './user-in-project-create-without-user.input';
import { UserInProjectUpdateWithoutUserInput } from './user-in-project-update-without-user.input';
import { UserInProjectWhereUniqueInput } from './user-in-project-where-unique.input';

@InputType()
export class UserInProjectUpsertWithWhereUniqueWithoutUserInput {
  @Field(() => UserInProjectWhereUniqueInput, { nullable: false })
  @Type(() => UserInProjectWhereUniqueInput)
  where!: Prisma.AtLeast<UserInProjectWhereUniqueInput, 'userId_projectId_permission_kind'>;

  @Field(() => UserInProjectUpdateWithoutUserInput, { nullable: false })
  @Type(() => UserInProjectUpdateWithoutUserInput)
  update!: UserInProjectUpdateWithoutUserInput;

  @Field(() => UserInProjectCreateWithoutUserInput, { nullable: false })
  @Type(() => UserInProjectCreateWithoutUserInput)
  create!: UserInProjectCreateWithoutUserInput;
}
