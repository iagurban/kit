import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadChunkWhereInput } from './upload-chunk-where.input';

@ArgsType()
export class DeleteManyUploadChunkArgs {
  @Field(() => UploadChunkWhereInput, { nullable: true })
  @Type(() => UploadChunkWhereInput)
  where?: UploadChunkWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
