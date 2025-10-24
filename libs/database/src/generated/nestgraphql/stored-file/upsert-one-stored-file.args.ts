import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { StoredFileCreateInput } from './stored-file-create.input';
import { StoredFileUpdateInput } from './stored-file-update.input';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@ArgsType()
export class UpsertOneStoredFileArgs {
  @Field(() => StoredFileWhereUniqueInput, { nullable: false })
  @Type(() => StoredFileWhereUniqueInput)
  where!: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id' | 'storageKey' | 'checksum_sizeBytes'>;

  @Field(() => StoredFileCreateInput, { nullable: false })
  @Type(() => StoredFileCreateInput)
  create!: StoredFileCreateInput;

  @Field(() => StoredFileUpdateInput, { nullable: false })
  @Type(() => StoredFileUpdateInput)
  update!: StoredFileUpdateInput;
}
