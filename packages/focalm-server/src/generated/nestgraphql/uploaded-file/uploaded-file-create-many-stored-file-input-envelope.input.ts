import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadedFileCreateManyStoredFileInput } from './uploaded-file-create-many-stored-file.input';

@InputType()
export class UploadedFileCreateManyStoredFileInputEnvelope {
  @Field(() => [UploadedFileCreateManyStoredFileInput], { nullable: false })
  @Type(() => UploadedFileCreateManyStoredFileInput)
  data!: Array<UploadedFileCreateManyStoredFileInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
