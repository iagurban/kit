import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadSessionCreateWithoutChunksInput } from './upload-session-create-without-chunks.input';
import { UploadSessionUpdateWithoutChunksInput } from './upload-session-update-without-chunks.input';
import { UploadSessionWhereInput } from './upload-session-where.input';

@InputType()
export class UploadSessionUpsertWithoutChunksInput {
  @Field(() => UploadSessionUpdateWithoutChunksInput, { nullable: false })
  @Type(() => UploadSessionUpdateWithoutChunksInput)
  update!: UploadSessionUpdateWithoutChunksInput;

  @Field(() => UploadSessionCreateWithoutChunksInput, { nullable: false })
  @Type(() => UploadSessionCreateWithoutChunksInput)
  create!: UploadSessionCreateWithoutChunksInput;

  @Field(() => UploadSessionWhereInput, { nullable: true })
  @Type(() => UploadSessionWhereInput)
  where?: UploadSessionWhereInput;
}
