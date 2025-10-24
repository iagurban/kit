import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UploadChunkOrderByWithRelationInput } from './upload-chunk-order-by-with-relation.input';
import { UploadChunkScalarFieldEnum } from './upload-chunk-scalar-field.enum';
import { UploadChunkWhereInput } from './upload-chunk-where.input';
import { UploadChunkWhereUniqueInput } from './upload-chunk-where-unique.input';

@ArgsType()
export class FindManyUploadChunkArgs {
  @Field(() => UploadChunkWhereInput, { nullable: true })
  @Type(() => UploadChunkWhereInput)
  where?: UploadChunkWhereInput;

  @Field(() => [UploadChunkOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<UploadChunkOrderByWithRelationInput>;

  @Field(() => UploadChunkWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<UploadChunkWhereUniqueInput, 'id' | 'sessionId_partNumber'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [UploadChunkScalarFieldEnum], { nullable: true })
  distinct?: Array<`${UploadChunkScalarFieldEnum}`>;
}
