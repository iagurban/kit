import { Field, InputType, Int } from '@nestjs/graphql';

import { UploadedFileCreateNestedManyWithoutStoredFileInput } from '../uploaded-file/uploaded-file-create-nested-many-without-stored-file.input';

@InputType()
export class StoredFileCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  hash!: string;

  @Field(() => Int, { nullable: false })
  size!: number;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => UploadedFileCreateNestedManyWithoutStoredFileInput, { nullable: true })
  uploads?: UploadedFileCreateNestedManyWithoutStoredFileInput;
}
