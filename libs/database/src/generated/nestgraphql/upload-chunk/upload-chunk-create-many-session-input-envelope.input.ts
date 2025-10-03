import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadChunkCreateManySessionInput } from './upload-chunk-create-many-session.input';

@InputType()
export class UploadChunkCreateManySessionInputEnvelope {
  @Field(() => [UploadChunkCreateManySessionInput], { nullable: false })
  @Type(() => UploadChunkCreateManySessionInput)
  data!: Array<UploadChunkCreateManySessionInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
