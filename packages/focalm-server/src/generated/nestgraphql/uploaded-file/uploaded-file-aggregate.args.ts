import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadedFileCountAggregateInput } from './uploaded-file-count-aggregate.input';
import { UploadedFileMaxAggregateInput } from './uploaded-file-max-aggregate.input';
import { UploadedFileMinAggregateInput } from './uploaded-file-min-aggregate.input';
import { UploadedFileOrderByWithRelationInput } from './uploaded-file-order-by-with-relation.input';
import { UploadedFileWhereInput } from './uploaded-file-where.input';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@ArgsType()
export class UploadedFileAggregateArgs {
  @Field(() => UploadedFileWhereInput, { nullable: true })
  @Type(() => UploadedFileWhereInput)
  where?: UploadedFileWhereInput;

  @Field(() => [UploadedFileOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<UploadedFileOrderByWithRelationInput>;

  @Field(() => UploadedFileWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

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
