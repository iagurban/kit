import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadChunkCreateManyInput } from './upload-chunk-create-many.input';

@ArgsType()
export class CreateManyUploadChunkArgs {
  @Field(() => [UploadChunkCreateManyInput], { nullable: false })
  @Type(() => UploadChunkCreateManyInput)
  data!: Array<UploadChunkCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
