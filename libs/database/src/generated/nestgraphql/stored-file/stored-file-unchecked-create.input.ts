import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { UploadSessionUncheckedCreateNestedOneWithoutFileInput } from '../upload-session/upload-session-unchecked-create-nested-one-without-file.input';

@InputType()
export class StoredFileUncheckedCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  checksum!: string;

  @Field(() => String, { nullable: false })
  sizeBytes!: bigint | number;

  @Field(() => String, { nullable: false })
  originalFilename!: string;

  @Field(() => String, { nullable: false })
  mimeType!: string;

  @Field(() => String, { nullable: false })
  storageKey!: string;

  @Field(() => String, { nullable: false })
  cdnUrl!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: any;

  @Field(() => String, { nullable: false })
  uploadedByUserId!: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => UploadSessionUncheckedCreateNestedOneWithoutFileInput, { nullable: true })
  uploadSession?: UploadSessionUncheckedCreateNestedOneWithoutFileInput;
}
