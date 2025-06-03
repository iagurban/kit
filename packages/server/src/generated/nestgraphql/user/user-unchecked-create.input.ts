import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuUncheckedCreateNestedManyWithoutOwnerInput } from '../menu/menu-unchecked-create-nested-many-without-owner.input';
import { RefreshTokenUncheckedCreateNestedManyWithoutUserInput } from '../refresh-token/refresh-token-unchecked-create-nested-many-without-user.input';
import { UploadedFileUncheckedCreateNestedManyWithoutUploaderInput } from '../uploaded-file/uploaded-file-unchecked-create-nested-many-without-uploader.input';

@InputType()
export class UserUncheckedCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  passwordHash!: string;

  @Field(() => MenuUncheckedCreateNestedManyWithoutOwnerInput, { nullable: true })
  @Type(() => MenuUncheckedCreateNestedManyWithoutOwnerInput)
  menus?: MenuUncheckedCreateNestedManyWithoutOwnerInput;

  @Field(() => UploadedFileUncheckedCreateNestedManyWithoutUploaderInput, { nullable: true })
  @Type(() => UploadedFileUncheckedCreateNestedManyWithoutUploaderInput)
  uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutUploaderInput;

  @Field(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInput, { nullable: true })
  refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
}
