import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserInTaskCreateOrConnectWithoutTagsInput } from './user-in-task-create-or-connect-without-tags.input';
import { UserInTaskCreateWithoutTagsInput } from './user-in-task-create-without-tags.input';
import { UserInTaskWhereUniqueInput } from './user-in-task-where-unique.input';

@InputType()
export class UserInTaskCreateNestedOneWithoutTagsInput {
  @Field(() => UserInTaskCreateWithoutTagsInput, { nullable: true })
  @Type(() => UserInTaskCreateWithoutTagsInput)
  create?: UserInTaskCreateWithoutTagsInput;

  @Field(() => UserInTaskCreateOrConnectWithoutTagsInput, { nullable: true })
  @Type(() => UserInTaskCreateOrConnectWithoutTagsInput)
  connectOrCreate?: UserInTaskCreateOrConnectWithoutTagsInput;

  @Field(() => UserInTaskWhereUniqueInput, { nullable: true })
  @Type(() => UserInTaskWhereUniqueInput)
  connect?: Prisma.AtLeast<UserInTaskWhereUniqueInput, 'id'>;
}
