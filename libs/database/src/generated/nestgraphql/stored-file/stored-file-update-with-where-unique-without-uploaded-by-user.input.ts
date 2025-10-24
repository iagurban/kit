import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { StoredFileUpdateWithoutUploadedByUserInput } from './stored-file-update-without-uploaded-by-user.input';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@InputType()
export class StoredFileUpdateWithWhereUniqueWithoutUploadedByUserInput {
  @Field(() => StoredFileWhereUniqueInput, { nullable: false })
  @Type(() => StoredFileWhereUniqueInput)
  where!: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id' | 'storageKey' | 'checksum_sizeBytes'>;

  @Field(() => StoredFileUpdateWithoutUploadedByUserInput, { nullable: false })
  @Type(() => StoredFileUpdateWithoutUploadedByUserInput)
  data!: StoredFileUpdateWithoutUploadedByUserInput;
}
