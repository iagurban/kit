import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { StoredFileCreateWithoutUploadedByUserInput } from './stored-file-create-without-uploaded-by-user.input';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@InputType()
export class StoredFileCreateOrConnectWithoutUploadedByUserInput {
  @Field(() => StoredFileWhereUniqueInput, { nullable: false })
  @Type(() => StoredFileWhereUniqueInput)
  where!: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id' | 'storageKey' | 'checksum_sizeBytes'>;

  @Field(() => StoredFileCreateWithoutUploadedByUserInput, { nullable: false })
  @Type(() => StoredFileCreateWithoutUploadedByUserInput)
  create!: StoredFileCreateWithoutUploadedByUserInput;
}
