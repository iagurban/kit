import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadedFileUpdateWithoutStoredFileInput } from './uploaded-file-update-without-stored-file.input';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@InputType()
export class UploadedFileUpdateWithWhereUniqueWithoutStoredFileInput {
  @Field(() => UploadedFileWhereUniqueInput, { nullable: false })
  @Type(() => UploadedFileWhereUniqueInput)
  where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

  @Field(() => UploadedFileUpdateWithoutStoredFileInput, { nullable: false })
  @Type(() => UploadedFileUpdateWithoutStoredFileInput)
  data!: UploadedFileUpdateWithoutStoredFileInput;
}
