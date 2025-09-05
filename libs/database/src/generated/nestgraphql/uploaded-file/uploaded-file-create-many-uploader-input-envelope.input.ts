import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadedFileCreateManyUploaderInput } from './uploaded-file-create-many-uploader.input';

@InputType()
export class UploadedFileCreateManyUploaderInputEnvelope {
  @Field(() => [UploadedFileCreateManyUploaderInput], { nullable: false })
  @Type(() => UploadedFileCreateManyUploaderInput)
  data!: Array<UploadedFileCreateManyUploaderInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
