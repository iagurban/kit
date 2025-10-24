import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UploadChunkUpdateInput } from './upload-chunk-update.input';
import { UploadChunkWhereUniqueInput } from './upload-chunk-where-unique.input';

@ArgsType()
export class UpdateOneUploadChunkArgs {
  @Field(() => UploadChunkUpdateInput, { nullable: false })
  @Type(() => UploadChunkUpdateInput)
  data!: UploadChunkUpdateInput;

  @Field(() => UploadChunkWhereUniqueInput, { nullable: false })
  @Type(() => UploadChunkWhereUniqueInput)
  where!: Prisma.AtLeast<UploadChunkWhereUniqueInput, 'id' | 'sessionId_partNumber'>;
}
