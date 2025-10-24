import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { StoredFileOrderByWithRelationInput } from './stored-file-order-by-with-relation.input';
import { StoredFileScalarFieldEnum } from './stored-file-scalar-field.enum';
import { StoredFileWhereInput } from './stored-file-where.input';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@ArgsType()
export class FindFirstStoredFileArgs {
  @Field(() => StoredFileWhereInput, { nullable: true })
  @Type(() => StoredFileWhereInput)
  where?: StoredFileWhereInput;

  @Field(() => [StoredFileOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<StoredFileOrderByWithRelationInput>;

  @Field(() => StoredFileWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id' | 'storageKey' | 'checksum_sizeBytes'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [StoredFileScalarFieldEnum], { nullable: true })
  distinct?: Array<`${StoredFileScalarFieldEnum}`>;
}
