import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadedFileCreateManyStoredFileInputEnvelope } from './uploaded-file-create-many-stored-file-input-envelope.input';
import { UploadedFileCreateOrConnectWithoutStoredFileInput } from './uploaded-file-create-or-connect-without-stored-file.input';
import { UploadedFileCreateWithoutStoredFileInput } from './uploaded-file-create-without-stored-file.input';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@InputType()
export class UploadedFileCreateNestedManyWithoutStoredFileInput {
  @Field(() => [UploadedFileCreateWithoutStoredFileInput], { nullable: true })
  @Type(() => UploadedFileCreateWithoutStoredFileInput)
  create?: Array<UploadedFileCreateWithoutStoredFileInput>;

  @Field(() => [UploadedFileCreateOrConnectWithoutStoredFileInput], { nullable: true })
  @Type(() => UploadedFileCreateOrConnectWithoutStoredFileInput)
  connectOrCreate?: Array<UploadedFileCreateOrConnectWithoutStoredFileInput>;

  @Field(() => UploadedFileCreateManyStoredFileInputEnvelope, { nullable: true })
  @Type(() => UploadedFileCreateManyStoredFileInputEnvelope)
  createMany?: UploadedFileCreateManyStoredFileInputEnvelope;

  @Field(() => [UploadedFileWhereUniqueInput], { nullable: true })
  @Type(() => UploadedFileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>>;
}
