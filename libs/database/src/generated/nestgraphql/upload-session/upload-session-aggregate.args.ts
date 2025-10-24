import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UploadSessionAvgAggregateInput } from './upload-session-avg-aggregate.input';
import { UploadSessionCountAggregateInput } from './upload-session-count-aggregate.input';
import { UploadSessionMaxAggregateInput } from './upload-session-max-aggregate.input';
import { UploadSessionMinAggregateInput } from './upload-session-min-aggregate.input';
import { UploadSessionOrderByWithRelationInput } from './upload-session-order-by-with-relation.input';
import { UploadSessionSumAggregateInput } from './upload-session-sum-aggregate.input';
import { UploadSessionWhereInput } from './upload-session-where.input';
import { UploadSessionWhereUniqueInput } from './upload-session-where-unique.input';

@ArgsType()
export class UploadSessionAggregateArgs {
  @Field(() => UploadSessionWhereInput, { nullable: true })
  @Type(() => UploadSessionWhereInput)
  where?: UploadSessionWhereInput;

  @Field(() => [UploadSessionOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<UploadSessionOrderByWithRelationInput>;

  @Field(() => UploadSessionWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<UploadSessionWhereUniqueInput, 'id' | 'storageUploadId' | 'fileId'>;

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
