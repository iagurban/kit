import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { StoredFileCreateWithoutUploadedByUserInput } from './stored-file-create-without-uploaded-by-user.input';
import { StoredFileUpdateWithoutUploadedByUserInput } from './stored-file-update-without-uploaded-by-user.input';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@InputType()
export class StoredFileUpsertWithWhereUniqueWithoutUploadedByUserInput {
  @Field(() => StoredFileWhereUniqueInput, { nullable: false })
  @Type(() => StoredFileWhereUniqueInput)
  where!: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id' | 'storageKey' | 'checksum_sizeBytes'>;

  @Field(() => StoredFileUpdateWithoutUploadedByUserInput, { nullable: false })
  @Type(() => StoredFileUpdateWithoutUploadedByUserInput)
  update!: StoredFileUpdateWithoutUploadedByUserInput;

  @Field(() => StoredFileCreateWithoutUploadedByUserInput, { nullable: false })
  @Type(() => StoredFileCreateWithoutUploadedByUserInput)
  create!: StoredFileCreateWithoutUploadedByUserInput;
}
