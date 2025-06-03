import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { StoredFileAvgAggregateInput } from './stored-file-avg-aggregate.input';
import { StoredFileCountAggregateInput } from './stored-file-count-aggregate.input';
import { StoredFileMaxAggregateInput } from './stored-file-max-aggregate.input';
import { StoredFileMinAggregateInput } from './stored-file-min-aggregate.input';
import { StoredFileOrderByWithAggregationInput } from './stored-file-order-by-with-aggregation.input';
import { StoredFileScalarFieldEnum } from './stored-file-scalar-field.enum';
import { StoredFileScalarWhereWithAggregatesInput } from './stored-file-scalar-where-with-aggregates.input';
import { StoredFileSumAggregateInput } from './stored-file-sum-aggregate.input';
import { StoredFileWhereInput } from './stored-file-where.input';

@ArgsType()
export class StoredFileGroupByArgs {
  @Field(() => StoredFileWhereInput, { nullable: true })
  @Type(() => StoredFileWhereInput)
  where?: StoredFileWhereInput;

  @Field(() => [StoredFileOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<StoredFileOrderByWithAggregationInput>;

  @Field(() => [StoredFileScalarFieldEnum], { nullable: false })
  by!: Array<`${StoredFileScalarFieldEnum}`>;

  @Field(() => StoredFileScalarWhereWithAggregatesInput, { nullable: true })
  having?: StoredFileScalarWhereWithAggregatesInput;

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
