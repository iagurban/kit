import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadChunkCreateInput } from './upload-chunk-create.input';

@ArgsType()
export class CreateOneUploadChunkArgs {
  @Field(() => UploadChunkCreateInput, { nullable: false })
  @Type(() => UploadChunkCreateInput)
  data!: UploadChunkCreateInput;
}
