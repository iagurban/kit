import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateWithoutUploadedFilesInput } from './user-create-without-uploaded-files.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateOrConnectWithoutUploadedFilesInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

  @Field(() => UserCreateWithoutUploadedFilesInput, { nullable: false })
  @Type(() => UserCreateWithoutUploadedFilesInput)
  create!: UserCreateWithoutUploadedFilesInput;
}
