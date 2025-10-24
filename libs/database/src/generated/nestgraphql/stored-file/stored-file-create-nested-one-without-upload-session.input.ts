import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { StoredFileCreateOrConnectWithoutUploadSessionInput } from './stored-file-create-or-connect-without-upload-session.input';
import { StoredFileCreateWithoutUploadSessionInput } from './stored-file-create-without-upload-session.input';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@InputType()
export class StoredFileCreateNestedOneWithoutUploadSessionInput {
  @Field(() => StoredFileCreateWithoutUploadSessionInput, { nullable: true })
  @Type(() => StoredFileCreateWithoutUploadSessionInput)
  create?: StoredFileCreateWithoutUploadSessionInput;

  @Field(() => StoredFileCreateOrConnectWithoutUploadSessionInput, { nullable: true })
  @Type(() => StoredFileCreateOrConnectWithoutUploadSessionInput)
  connectOrCreate?: StoredFileCreateOrConnectWithoutUploadSessionInput;

  @Field(() => StoredFileWhereUniqueInput, { nullable: true })
  @Type(() => StoredFileWhereUniqueInput)
  connect?: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id' | 'storageKey' | 'checksum_sizeBytes'>;
}
