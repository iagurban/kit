import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UploadChunkWhereUniqueInput } from './upload-chunk-where-unique.input';

@ArgsType()
export class FindUniqueUploadChunkArgs {
  @Field(() => UploadChunkWhereUniqueInput, { nullable: false })
  @Type(() => UploadChunkWhereUniqueInput)
  where!: Prisma.AtLeast<UploadChunkWhereUniqueInput, 'id' | 'sessionId_partNumber'>;
}
