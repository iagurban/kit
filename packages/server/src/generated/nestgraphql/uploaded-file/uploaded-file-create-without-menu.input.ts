import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemCreateNestedManyWithoutImageInput } from '../item/item-create-nested-many-without-image.input';
import { StoredFileCreateNestedOneWithoutUploadsInput } from '../stored-file/stored-file-create-nested-one-without-uploads.input';
import { UserCreateNestedOneWithoutUploadedFilesInput } from '../user/user-create-nested-one-without-uploaded-files.input';

@InputType()
export class UploadedFileCreateWithoutMenuInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  originalName!: string;

  @Field(() => String, { nullable: false })
  mimetype!: string;

  @Field(() => Date, { nullable: true })
  uploadedAt?: Date | string;

  @Field(() => UserCreateNestedOneWithoutUploadedFilesInput, { nullable: false })
  uploader!: UserCreateNestedOneWithoutUploadedFilesInput;

  @Field(() => StoredFileCreateNestedOneWithoutUploadsInput, { nullable: false })
  storedFile!: StoredFileCreateNestedOneWithoutUploadsInput;

  @Field(() => ItemCreateNestedManyWithoutImageInput, { nullable: true })
  @Type(() => ItemCreateNestedManyWithoutImageInput)
  usingItems?: ItemCreateNestedManyWithoutImageInput;
}
