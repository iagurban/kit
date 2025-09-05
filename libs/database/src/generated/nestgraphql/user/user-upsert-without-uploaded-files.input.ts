import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserCreateWithoutUploadedFilesInput } from './user-create-without-uploaded-files.input';
import { UserUpdateWithoutUploadedFilesInput } from './user-update-without-uploaded-files.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutUploadedFilesInput {
  @Field(() => UserUpdateWithoutUploadedFilesInput, { nullable: false })
  @Type(() => UserUpdateWithoutUploadedFilesInput)
  update!: UserUpdateWithoutUploadedFilesInput;

  @Field(() => UserCreateWithoutUploadedFilesInput, { nullable: false })
  @Type(() => UserCreateWithoutUploadedFilesInput)
  create!: UserCreateWithoutUploadedFilesInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
