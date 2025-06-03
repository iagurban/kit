import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateWithoutAuthoredTaskChangesInput } from './user-create-without-authored-task-changes.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutAuthoredTaskChangesInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

  @Field(() => UserCreateWithoutAuthoredTaskChangesInput, { nullable: false })
  @Type(() => UserCreateWithoutAuthoredTaskChangesInput)
  create!: UserCreateWithoutAuthoredTaskChangesInput;
}
