import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskCreateWithoutTagsInput } from './user-in-task-create-without-tags.input';
import { UserInTaskWhereUniqueInput } from './user-in-task-where-unique.input';

@InputType()
export class UserInTaskCreateOrConnectWithoutTagsInput {
  @Field(() => UserInTaskWhereUniqueInput, { nullable: false })
  @Type(() => UserInTaskWhereUniqueInput)
  where!: Prisma.AtLeast<UserInTaskWhereUniqueInput, 'id'>;

  @Field(() => UserInTaskCreateWithoutTagsInput, { nullable: false })
  @Type(() => UserInTaskCreateWithoutTagsInput)
  create!: UserInTaskCreateWithoutTagsInput;
}
