import { Field, InputType, Int } from '@nestjs/graphql';

import { UploadSessionCreateNestedOneWithoutChunksInput } from '../upload-session/upload-session-create-nested-one-without-chunks.input';

@InputType()
export class UploadChunkCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Int, { nullable: false })
  partNumber!: number;

  @Field(() => String, { nullable: true })
  eTag?: string;

  @Field(() => Date, { nullable: true })
  leasedAt?: Date | string;

  @Field(() => UploadSessionCreateNestedOneWithoutChunksInput, { nullable: false })
  session!: UploadSessionCreateNestedOneWithoutChunksInput;
}
