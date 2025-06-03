import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadedFileCreateManyMenuInput } from './uploaded-file-create-many-menu.input';

@InputType()
export class UploadedFileCreateManyMenuInputEnvelope {
  @Field(() => [UploadedFileCreateManyMenuInput], { nullable: false })
  @Type(() => UploadedFileCreateManyMenuInput)
  data!: Array<UploadedFileCreateManyMenuInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
