import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadedFileCreateWithoutUploaderInput } from './uploaded-file-create-without-uploader.input';
import { UploadedFileUpdateWithoutUploaderInput } from './uploaded-file-update-without-uploader.input';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@InputType()
export class UploadedFileUpsertWithWhereUniqueWithoutUploaderInput {
  @Field(() => UploadedFileWhereUniqueInput, { nullable: false })
  @Type(() => UploadedFileWhereUniqueInput)
  where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

  @Field(() => UploadedFileUpdateWithoutUploaderInput, { nullable: false })
  @Type(() => UploadedFileUpdateWithoutUploaderInput)
  update!: UploadedFileUpdateWithoutUploaderInput;

  @Field(() => UploadedFileCreateWithoutUploaderInput, { nullable: false })
  @Type(() => UploadedFileCreateWithoutUploaderInput)
  create!: UploadedFileCreateWithoutUploaderInput;
}
