import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadedFileCountAggregateInput } from './uploaded-file-count-aggregate.input';
import { UploadedFileMaxAggregateInput } from './uploaded-file-max-aggregate.input';
import { UploadedFileMinAggregateInput } from './uploaded-file-min-aggregate.input';
import { UploadedFileOrderByWithAggregationInput } from './uploaded-file-order-by-with-aggregation.input';
import { UploadedFileScalarFieldEnum } from './uploaded-file-scalar-field.enum';
import { UploadedFileScalarWhereWithAggregatesInput } from './uploaded-file-scalar-where-with-aggregates.input';
import { UploadedFileWhereInput } from './uploaded-file-where.input';

@ArgsType()
export class UploadedFileGroupByArgs {
  @Field(() => UploadedFileWhereInput, { nullable: true })
  @Type(() => UploadedFileWhereInput)
  where?: UploadedFileWhereInput;

  @Field(() => [UploadedFileOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<UploadedFileOrderByWithAggregationInput>;

  @Field(() => [UploadedFileScalarFieldEnum], { nullable: false })
  by!: Array<`${UploadedFileScalarFieldEnum}`>;

  @Field(() => UploadedFileScalarWhereWithAggregatesInput, { nullable: true })
  having?: UploadedFileScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => UploadedFileCountAggregateInput, { nullable: true })
  _count?: UploadedFileCountAggregateInput;

  @Field(() => UploadedFileMinAggregateInput, { nullable: true })
  _min?: UploadedFileMinAggregateInput;

  @Field(() => UploadedFileMaxAggregateInput, { nullable: true })
  _max?: UploadedFileMaxAggregateInput;
}
