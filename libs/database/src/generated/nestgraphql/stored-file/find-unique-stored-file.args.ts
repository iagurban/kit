import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@ArgsType()
export class FindUniqueStoredFileArgs {
  @Field(() => StoredFileWhereUniqueInput, { nullable: false })
  @Type(() => StoredFileWhereUniqueInput)
  where!: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id' | 'storageKey' | 'checksum_sizeBytes'>;
}
