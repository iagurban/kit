import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UserCreateOrConnectWithoutUploadedFilesInput } from './user-create-or-connect-without-uploaded-files.input';
import { UserCreateWithoutUploadedFilesInput } from './user-create-without-uploaded-files.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutUploadedFilesInput {
  @Field(() => UserCreateWithoutUploadedFilesInput, { nullable: true })
  @Type(() => UserCreateWithoutUploadedFilesInput)
  create?: UserCreateWithoutUploadedFilesInput;

  @Field(() => UserCreateOrConnectWithoutUploadedFilesInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutUploadedFilesInput)
  connectOrCreate?: UserCreateOrConnectWithoutUploadedFilesInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;
}
