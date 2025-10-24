import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { StoredFileCreateManyUploadedByUserInputEnvelope } from './stored-file-create-many-uploaded-by-user-input-envelope.input';
import { StoredFileCreateOrConnectWithoutUploadedByUserInput } from './stored-file-create-or-connect-without-uploaded-by-user.input';
import { StoredFileCreateWithoutUploadedByUserInput } from './stored-file-create-without-uploaded-by-user.input';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@InputType()
export class StoredFileUncheckedCreateNestedManyWithoutUploadedByUserInput {
  @Field(() => [StoredFileCreateWithoutUploadedByUserInput], { nullable: true })
  @Type(() => StoredFileCreateWithoutUploadedByUserInput)
  create?: Array<StoredFileCreateWithoutUploadedByUserInput>;

  @Field(() => [StoredFileCreateOrConnectWithoutUploadedByUserInput], { nullable: true })
  @Type(() => StoredFileCreateOrConnectWithoutUploadedByUserInput)
  connectOrCreate?: Array<StoredFileCreateOrConnectWithoutUploadedByUserInput>;

  @Field(() => StoredFileCreateManyUploadedByUserInputEnvelope, { nullable: true })
  @Type(() => StoredFileCreateManyUploadedByUserInputEnvelope)
  createMany?: StoredFileCreateManyUploadedByUserInputEnvelope;

  @Field(() => [StoredFileWhereUniqueInput], { nullable: true })
  @Type(() => StoredFileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<StoredFileWhereUniqueInput, 'id' | 'storageKey' | 'checksum_sizeBytes'>>;
}
