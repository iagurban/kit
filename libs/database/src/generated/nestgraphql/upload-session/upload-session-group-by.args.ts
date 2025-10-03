import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadSessionAvgAggregateInput } from './upload-session-avg-aggregate.input';
import { UploadSessionCountAggregateInput } from './upload-session-count-aggregate.input';
import { UploadSessionMaxAggregateInput } from './upload-session-max-aggregate.input';
import { UploadSessionMinAggregateInput } from './upload-session-min-aggregate.input';
import { UploadSessionOrderByWithAggregationInput } from './upload-session-order-by-with-aggregation.input';
import { UploadSessionScalarFieldEnum } from './upload-session-scalar-field.enum';
import { UploadSessionScalarWhereWithAggregatesInput } from './upload-session-scalar-where-with-aggregates.input';
import { UploadSessionSumAggregateInput } from './upload-session-sum-aggregate.input';
import { UploadSessionWhereInput } from './upload-session-where.input';

@ArgsType()
export class UploadSessionGroupByArgs {
  @Field(() => UploadSessionWhereInput, { nullable: true })
  @Type(() => UploadSessionWhereInput)
  where?: UploadSessionWhereInput;

  @Field(() => [UploadSessionOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<UploadSessionOrderByWithAggregationInput>;

  @Field(() => [UploadSessionScalarFieldEnum], { nullable: false })
  by!: Array<`${UploadSessionScalarFieldEnum}`>;

  @Field(() => UploadSessionScalarWhereWithAggregatesInput, { nullable: true })
  having?: UploadSessionScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => UploadSessionCountAggregateInput, { nullable: true })
  _count?: UploadSessionCountAggregateInput;

  @Field(() => UploadSessionAvgAggregateInput, { nullable: true })
  _avg?: UploadSessionAvgAggregateInput;

  @Field(() => UploadSessionSumAggregateInput, { nullable: true })
  _sum?: UploadSessionSumAggregateInput;

  @Field(() => UploadSessionMinAggregateInput, { nullable: true })
  _min?: UploadSessionMinAggregateInput;

  @Field(() => UploadSessionMaxAggregateInput, { nullable: true })
  _max?: UploadSessionMaxAggregateInput;
}
