import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadedFileCreateManyUploaderInputEnvelope } from './uploaded-file-create-many-uploader-input-envelope.input';
import { UploadedFileCreateOrConnectWithoutUploaderInput } from './uploaded-file-create-or-connect-without-uploader.input';
import { UploadedFileCreateWithoutUploaderInput } from './uploaded-file-create-without-uploader.input';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@InputType()
export class UploadedFileUncheckedCreateNestedManyWithoutUploaderInput {
  @Field(() => [UploadedFileCreateWithoutUploaderInput], { nullable: true })
  @Type(() => UploadedFileCreateWithoutUploaderInput)
  create?: Array<UploadedFileCreateWithoutUploaderInput>;

  @Field(() => [UploadedFileCreateOrConnectWithoutUploaderInput], { nullable: true })
  @Type(() => UploadedFileCreateOrConnectWithoutUploaderInput)
  connectOrCreate?: Array<UploadedFileCreateOrConnectWithoutUploaderInput>;

  @Field(() => UploadedFileCreateManyUploaderInputEnvelope, { nullable: true })
  @Type(() => UploadedFileCreateManyUploaderInputEnvelope)
  createMany?: UploadedFileCreateManyUploaderInputEnvelope;

  @Field(() => [UploadedFileWhereUniqueInput], { nullable: true })
  @Type(() => UploadedFileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>>;
}
