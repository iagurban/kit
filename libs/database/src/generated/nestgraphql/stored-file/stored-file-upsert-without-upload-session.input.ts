import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { StoredFileCreateWithoutUploadSessionInput } from './stored-file-create-without-upload-session.input';
import { StoredFileUpdateWithoutUploadSessionInput } from './stored-file-update-without-upload-session.input';
import { StoredFileWhereInput } from './stored-file-where.input';

@InputType()
export class StoredFileUpsertWithoutUploadSessionInput {
  @Field(() => StoredFileUpdateWithoutUploadSessionInput, { nullable: false })
  @Type(() => StoredFileUpdateWithoutUploadSessionInput)
  update!: StoredFileUpdateWithoutUploadSessionInput;

  @Field(() => StoredFileCreateWithoutUploadSessionInput, { nullable: false })
  @Type(() => StoredFileCreateWithoutUploadSessionInput)
  create!: StoredFileCreateWithoutUploadSessionInput;

  @Field(() => StoredFileWhereInput, { nullable: true })
  @Type(() => StoredFileWhereInput)
  where?: StoredFileWhereInput;
}
