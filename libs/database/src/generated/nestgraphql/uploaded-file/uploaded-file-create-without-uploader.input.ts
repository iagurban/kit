import { Field, InputType } from '@nestjs/graphql';

import { StoredFileCreateNestedOneWithoutUploadsInput } from '../stored-file/stored-file-create-nested-one-without-uploads.input';

@InputType()
export class UploadedFileCreateWithoutUploaderInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  originalName!: string;

  @Field(() => String, { nullable: false })
  mimetype!: string;

  @Field(() => Date, { nullable: true })
  uploadedAt?: Date | string;

  @Field(() => StoredFileCreateNestedOneWithoutUploadsInput, { nullable: false })
  storedFile!: StoredFileCreateNestedOneWithoutUploadsInput;
}
