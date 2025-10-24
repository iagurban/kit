import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UserCreateOrConnectWithoutUploadedFilesInput } from './user-create-or-connect-without-uploaded-files.input';
import { UserCreateWithoutUploadedFilesInput } from './user-create-without-uploaded-files.input';
import { UserUpdateToOneWithWhereWithoutUploadedFilesInput } from './user-update-to-one-with-where-without-uploaded-files.input';
import { UserUpsertWithoutUploadedFilesInput } from './user-upsert-without-uploaded-files.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserUpdateOneRequiredWithoutUploadedFilesNestedInput {
  @Field(() => UserCreateWithoutUploadedFilesInput, { nullable: true })
  @Type(() => UserCreateWithoutUploadedFilesInput)
  create?: UserCreateWithoutUploadedFilesInput;

  @Field(() => UserCreateOrConnectWithoutUploadedFilesInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutUploadedFilesInput)
  connectOrCreate?: UserCreateOrConnectWithoutUploadedFilesInput;

  @Field(() => UserUpsertWithoutUploadedFilesInput, { nullable: true })
  @Type(() => UserUpsertWithoutUploadedFilesInput)
  upsert?: UserUpsertWithoutUploadedFilesInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

  @Field(() => UserUpdateToOneWithWhereWithoutUploadedFilesInput, { nullable: true })
  @Type(() => UserUpdateToOneWithWhereWithoutUploadedFilesInput)
  update?: UserUpdateToOneWithWhereWithoutUploadedFilesInput;
}
