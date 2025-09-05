import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadedFileCreateManyUploaderInputEnvelope } from './uploaded-file-create-many-uploader-input-envelope.input';
import { UploadedFileCreateOrConnectWithoutUploaderInput } from './uploaded-file-create-or-connect-without-uploader.input';
import { UploadedFileCreateWithoutUploaderInput } from './uploaded-file-create-without-uploader.input';
import { UploadedFileScalarWhereInput } from './uploaded-file-scalar-where.input';
import { UploadedFileUpdateManyWithWhereWithoutUploaderInput } from './uploaded-file-update-many-with-where-without-uploader.input';
import { UploadedFileUpdateWithWhereUniqueWithoutUploaderInput } from './uploaded-file-update-with-where-unique-without-uploader.input';
import { UploadedFileUpsertWithWhereUniqueWithoutUploaderInput } from './uploaded-file-upsert-with-where-unique-without-uploader.input';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@InputType()
export class UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput {
  @Field(() => [UploadedFileCreateWithoutUploaderInput], { nullable: true })
  @Type(() => UploadedFileCreateWithoutUploaderInput)
  create?: Array<UploadedFileCreateWithoutUploaderInput>;

  @Field(() => [UploadedFileCreateOrConnectWithoutUploaderInput], { nullable: true })
  @Type(() => UploadedFileCreateOrConnectWithoutUploaderInput)
  connectOrCreate?: Array<UploadedFileCreateOrConnectWithoutUploaderInput>;

  @Field(() => [UploadedFileUpsertWithWhereUniqueWithoutUploaderInput], { nullable: true })
  @Type(() => UploadedFileUpsertWithWhereUniqueWithoutUploaderInput)
  upsert?: Array<UploadedFileUpsertWithWhereUniqueWithoutUploaderInput>;

  @Field(() => UploadedFileCreateManyUploaderInputEnvelope, { nullable: true })
  @Type(() => UploadedFileCreateManyUploaderInputEnvelope)
  createMany?: UploadedFileCreateManyUploaderInputEnvelope;

  @Field(() => [UploadedFileWhereUniqueInput], { nullable: true })
  @Type(() => UploadedFileWhereUniqueInput)
  set?: Array<Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>>;

  @Field(() => [UploadedFileWhereUniqueInput], { nullable: true })
  @Type(() => UploadedFileWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>>;

  @Field(() => [UploadedFileWhereUniqueInput], { nullable: true })
  @Type(() => UploadedFileWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>>;

  @Field(() => [UploadedFileWhereUniqueInput], { nullable: true })
  @Type(() => UploadedFileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>>;

  @Field(() => [UploadedFileUpdateWithWhereUniqueWithoutUploaderInput], { nullable: true })
  @Type(() => UploadedFileUpdateWithWhereUniqueWithoutUploaderInput)
  update?: Array<UploadedFileUpdateWithWhereUniqueWithoutUploaderInput>;

  @Field(() => [UploadedFileUpdateManyWithWhereWithoutUploaderInput], { nullable: true })
  @Type(() => UploadedFileUpdateManyWithWhereWithoutUploaderInput)
  updateMany?: Array<UploadedFileUpdateManyWithWhereWithoutUploaderInput>;

  @Field(() => [UploadedFileScalarWhereInput], { nullable: true })
  @Type(() => UploadedFileScalarWhereInput)
  deleteMany?: Array<UploadedFileScalarWhereInput>;
}
