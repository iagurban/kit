import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { StoredFileUpdateInput } from './stored-file-update.input';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@ArgsType()
export class UpdateOneStoredFileArgs {
  @Field(() => StoredFileUpdateInput, { nullable: false })
  @Type(() => StoredFileUpdateInput)
  data!: StoredFileUpdateInput;

  @Field(() => StoredFileWhereUniqueInput, { nullable: false })
  @Type(() => StoredFileWhereUniqueInput)
  where!: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id' | 'storageKey' | 'checksum_sizeBytes'>;
}
