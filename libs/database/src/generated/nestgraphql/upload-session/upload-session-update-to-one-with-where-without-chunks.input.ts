import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadSessionUpdateWithoutChunksInput } from './upload-session-update-without-chunks.input';
import { UploadSessionWhereInput } from './upload-session-where.input';

@InputType()
export class UploadSessionUpdateToOneWithWhereWithoutChunksInput {
  @Field(() => UploadSessionWhereInput, { nullable: true })
  @Type(() => UploadSessionWhereInput)
  where?: UploadSessionWhereInput;

  @Field(() => UploadSessionUpdateWithoutChunksInput, { nullable: false })
  @Type(() => UploadSessionUpdateWithoutChunksInput)
  data!: UploadSessionUpdateWithoutChunksInput;
}
