import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { StoredFileCreateManyUploadedByUserInputEnvelope } from './stored-file-create-many-uploaded-by-user-input-envelope.input';
import { StoredFileCreateOrConnectWithoutUploadedByUserInput } from './stored-file-create-or-connect-without-uploaded-by-user.input';
import { StoredFileCreateWithoutUploadedByUserInput } from './stored-file-create-without-uploaded-by-user.input';
import { StoredFileScalarWhereInput } from './stored-file-scalar-where.input';
import { StoredFileUpdateManyWithWhereWithoutUploadedByUserInput } from './stored-file-update-many-with-where-without-uploaded-by-user.input';
import { StoredFileUpdateWithWhereUniqueWithoutUploadedByUserInput } from './stored-file-update-with-where-unique-without-uploaded-by-user.input';
import { StoredFileUpsertWithWhereUniqueWithoutUploadedByUserInput } from './stored-file-upsert-with-where-unique-without-uploaded-by-user.input';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@InputType()
export class StoredFileUpdateManyWithoutUploadedByUserNestedInput {
  @Field(() => [StoredFileCreateWithoutUploadedByUserInput], { nullable: true })
  @Type(() => StoredFileCreateWithoutUploadedByUserInput)
  create?: Array<StoredFileCreateWithoutUploadedByUserInput>;

  @Field(() => [StoredFileCreateOrConnectWithoutUploadedByUserInput], { nullable: true })
  @Type(() => StoredFileCreateOrConnectWithoutUploadedByUserInput)
  connectOrCreate?: Array<StoredFileCreateOrConnectWithoutUploadedByUserInput>;

  @Field(() => [StoredFileUpsertWithWhereUniqueWithoutUploadedByUserInput], { nullable: true })
  @Type(() => StoredFileUpsertWithWhereUniqueWithoutUploadedByUserInput)
  upsert?: Array<StoredFileUpsertWithWhereUniqueWithoutUploadedByUserInput>;

  @Field(() => StoredFileCreateManyUploadedByUserInputEnvelope, { nullable: true })
  @Type(() => StoredFileCreateManyUploadedByUserInputEnvelope)
  createMany?: StoredFileCreateManyUploadedByUserInputEnvelope;

  @Field(() => [StoredFileWhereUniqueInput], { nullable: true })
  @Type(() => StoredFileWhereUniqueInput)
  set?: Array<Prisma.AtLeast<StoredFileWhereUniqueInput, 'id' | 'storageKey' | 'checksum_sizeBytes'>>;

  @Field(() => [StoredFileWhereUniqueInput], { nullable: true })
  @Type(() => StoredFileWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<StoredFileWhereUniqueInput, 'id' | 'storageKey' | 'checksum_sizeBytes'>>;

  @Field(() => [StoredFileWhereUniqueInput], { nullable: true })
  @Type(() => StoredFileWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<StoredFileWhereUniqueInput, 'id' | 'storageKey' | 'checksum_sizeBytes'>>;

  @Field(() => [StoredFileWhereUniqueInput], { nullable: true })
  @Type(() => StoredFileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<StoredFileWhereUniqueInput, 'id' | 'storageKey' | 'checksum_sizeBytes'>>;

  @Field(() => [StoredFileUpdateWithWhereUniqueWithoutUploadedByUserInput], { nullable: true })
  @Type(() => StoredFileUpdateWithWhereUniqueWithoutUploadedByUserInput)
  update?: Array<StoredFileUpdateWithWhereUniqueWithoutUploadedByUserInput>;

  @Field(() => [StoredFileUpdateManyWithWhereWithoutUploadedByUserInput], { nullable: true })
  @Type(() => StoredFileUpdateManyWithWhereWithoutUploadedByUserInput)
  updateMany?: Array<StoredFileUpdateManyWithWhereWithoutUploadedByUserInput>;

  @Field(() => [StoredFileScalarWhereInput], { nullable: true })
  @Type(() => StoredFileScalarWhereInput)
  deleteMany?: Array<StoredFileScalarWhereInput>;
}
