import { Field, InputType } from '@nestjs/graphql';

import { UploadedFileCreateNestedManyWithoutUploaderInput } from '../uploaded-file/uploaded-file-create-nested-many-without-uploader.input';

@InputType()
export class UserCreateWithoutRefreshTokensInput {
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

  @Field(() => UploadedFileCreateNestedManyWithoutUploaderInput, { nullable: true })
  uploadedFiles?: UploadedFileCreateNestedManyWithoutUploaderInput;
}
