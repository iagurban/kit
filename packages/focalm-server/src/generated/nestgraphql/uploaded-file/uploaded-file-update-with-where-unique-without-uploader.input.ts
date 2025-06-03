import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadedFileUpdateWithoutUploaderInput } from './uploaded-file-update-without-uploader.input';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@InputType()
export class UploadedFileUpdateWithWhereUniqueWithoutUploaderInput {
  @Field(() => UploadedFileWhereUniqueInput, { nullable: false })
  @Type(() => UploadedFileWhereUniqueInput)
  where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

  @Field(() => UploadedFileUpdateWithoutUploaderInput, { nullable: false })
  @Type(() => UploadedFileUpdateWithoutUploaderInput)
  data!: UploadedFileUpdateWithoutUploaderInput;
}
