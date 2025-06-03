import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadedFileCreateWithoutMenuInput } from './uploaded-file-create-without-menu.input';
import { UploadedFileUpdateWithoutMenuInput } from './uploaded-file-update-without-menu.input';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@InputType()
export class UploadedFileUpsertWithWhereUniqueWithoutMenuInput {
  @Field(() => UploadedFileWhereUniqueInput, { nullable: false })
  @Type(() => UploadedFileWhereUniqueInput)
  where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

  @Field(() => UploadedFileUpdateWithoutMenuInput, { nullable: false })
  @Type(() => UploadedFileUpdateWithoutMenuInput)
  update!: UploadedFileUpdateWithoutMenuInput;

  @Field(() => UploadedFileCreateWithoutMenuInput, { nullable: false })
  @Type(() => UploadedFileCreateWithoutMenuInput)
  create!: UploadedFileCreateWithoutMenuInput;
}
