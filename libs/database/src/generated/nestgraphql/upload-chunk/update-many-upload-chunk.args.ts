import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadChunkUpdateManyMutationInput } from './upload-chunk-update-many-mutation.input';
import { UploadChunkWhereInput } from './upload-chunk-where.input';

@ArgsType()
export class UpdateManyUploadChunkArgs {
  @Field(() => UploadChunkUpdateManyMutationInput, { nullable: false })
  @Type(() => UploadChunkUpdateManyMutationInput)
  data!: UploadChunkUpdateManyMutationInput;

  @Field(() => UploadChunkWhereInput, { nullable: true })
  @Type(() => UploadChunkWhereInput)
  where?: UploadChunkWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
