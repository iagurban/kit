import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { StoredFileAvgAggregateInput } from './stored-file-avg-aggregate.input';
import { StoredFileCountAggregateInput } from './stored-file-count-aggregate.input';
import { StoredFileMaxAggregateInput } from './stored-file-max-aggregate.input';
import { StoredFileMinAggregateInput } from './stored-file-min-aggregate.input';
import { StoredFileOrderByWithRelationInput } from './stored-file-order-by-with-relation.input';
import { StoredFileSumAggregateInput } from './stored-file-sum-aggregate.input';
import { StoredFileWhereInput } from './stored-file-where.input';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@ArgsType()
export class StoredFileAggregateArgs {
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

  @Field(() => StoredFileCountAggregateInput, { nullable: true })
  _count?: StoredFileCountAggregateInput;

  @Field(() => StoredFileAvgAggregateInput, { nullable: true })
  _avg?: StoredFileAvgAggregateInput;

  @Field(() => StoredFileSumAggregateInput, { nullable: true })
  _sum?: StoredFileSumAggregateInput;

  @Field(() => StoredFileMinAggregateInput, { nullable: true })
  _min?: StoredFileMinAggregateInput;

  @Field(() => StoredFileMaxAggregateInput, { nullable: true })
  _max?: StoredFileMaxAggregateInput;
}
