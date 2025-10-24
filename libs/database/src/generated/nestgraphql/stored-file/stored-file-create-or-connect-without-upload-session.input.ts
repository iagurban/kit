import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { StoredFileCreateWithoutUploadSessionInput } from './stored-file-create-without-upload-session.input';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@InputType()
export class StoredFileCreateOrConnectWithoutUploadSessionInput {
  @Field(() => StoredFileWhereUniqueInput, { nullable: false })
  @Type(() => StoredFileWhereUniqueInput)
  where!: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id' | 'storageKey' | 'checksum_sizeBytes'>;

  @Field(() => StoredFileCreateWithoutUploadSessionInput, { nullable: false })
  @Type(() => StoredFileCreateWithoutUploadSessionInput)
  create!: StoredFileCreateWithoutUploadSessionInput;
}
