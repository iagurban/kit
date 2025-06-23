import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInProjectUpdateWithoutProjectInput } from './user-in-project-update-without-project.input';
import { UserInProjectWhereUniqueInput } from './user-in-project-where-unique.input';

@InputType()
export class UserInProjectUpdateWithWhereUniqueWithoutProjectInput {
  @Field(() => UserInProjectWhereUniqueInput, { nullable: false })
  @Type(() => UserInProjectWhereUniqueInput)
  where!: Prisma.AtLeast<UserInProjectWhereUniqueInput, 'userId_projectId_permission_kind'>;

  @Field(() => UserInProjectUpdateWithoutProjectInput, { nullable: false })
  @Type(() => UserInProjectUpdateWithoutProjectInput)
  data!: UserInProjectUpdateWithoutProjectInput;
}
