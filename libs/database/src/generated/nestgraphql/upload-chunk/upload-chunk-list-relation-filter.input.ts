import { Field, InputType } from '@nestjs/graphql';

import { UploadChunkWhereInput } from './upload-chunk-where.input';

@InputType()
export class UploadChunkListRelationFilter {
  @Field(() => UploadChunkWhereInput, { nullable: true })
  every?: UploadChunkWhereInput;

  @Field(() => UploadChunkWhereInput, { nullable: true })
  some?: UploadChunkWhereInput;

  @Field(() => UploadChunkWhereInput, { nullable: true })
  none?: UploadChunkWhereInput;
}
