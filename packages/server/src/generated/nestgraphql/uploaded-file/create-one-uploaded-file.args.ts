import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadedFileCreateInput } from './uploaded-file-create.input';

@ArgsType()
export class CreateOneUploadedFileArgs {
  @Field(() => UploadedFileCreateInput, { nullable: false })
  @Type(() => UploadedFileCreateInput)
  data!: UploadedFileCreateInput;
}
