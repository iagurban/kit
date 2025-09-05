import { Field, InputType, Int } from '@nestjs/graphql';

import { UploadedFileUncheckedCreateNestedManyWithoutStoredFileInput } from '../uploaded-file/uploaded-file-unchecked-create-nested-many-without-stored-file.input';

@InputType()
export class StoredFileUncheckedCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  hash!: string;

  @Field(() => Int, { nullable: false })
  size!: number;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => UploadedFileUncheckedCreateNestedManyWithoutStoredFileInput, { nullable: true })
  uploads?: UploadedFileUncheckedCreateNestedManyWithoutStoredFileInput;
}
