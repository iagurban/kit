import { Field, InputType } from '@nestjs/graphql';

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

  @Field(() => String, { nullable: true })
  abbrev?: string;

  @Field(() => String, { nullable: false })
  passwordHash!: string;

  @Field(() => UploadedFileUncheckedCreateNestedManyWithoutUploaderInput, { nullable: true })
  uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutUploaderInput;

  @Field(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInput, { nullable: true })
  refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
}
