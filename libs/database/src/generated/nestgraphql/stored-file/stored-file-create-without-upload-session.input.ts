import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { UserCreateNestedOneWithoutUploadedFilesInput } from '../user/user-create-nested-one-without-uploaded-files.input';

@InputType()
export class StoredFileCreateWithoutUploadSessionInput {
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

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => UserCreateNestedOneWithoutUploadedFilesInput, { nullable: false })
  uploadedByUser!: UserCreateNestedOneWithoutUploadedFilesInput;
}
