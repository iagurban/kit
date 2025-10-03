import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadChunkCreateInput } from './upload-chunk-create.input';
import { UploadChunkUpdateInput } from './upload-chunk-update.input';
import { UploadChunkWhereUniqueInput } from './upload-chunk-where-unique.input';

@ArgsType()
export class UpsertOneUploadChunkArgs {
  @Field(() => UploadChunkWhereUniqueInput, { nullable: false })
  @Type(() => UploadChunkWhereUniqueInput)
  where!: Prisma.AtLeast<UploadChunkWhereUniqueInput, 'id' | 'sessionId_partNumber'>;

  @Field(() => UploadChunkCreateInput, { nullable: false })
  @Type(() => UploadChunkCreateInput)
  create!: UploadChunkCreateInput;

  @Field(() => UploadChunkUpdateInput, { nullable: false })
  @Type(() => UploadChunkUpdateInput)
  update!: UploadChunkUpdateInput;
}
