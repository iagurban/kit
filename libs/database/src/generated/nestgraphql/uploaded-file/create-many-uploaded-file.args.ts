import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadedFileCreateManyInput } from './uploaded-file-create-many.input';

@ArgsType()
export class CreateManyUploadedFileArgs {
  @Field(() => [UploadedFileCreateManyInput], { nullable: false })
  @Type(() => UploadedFileCreateManyInput)
  data!: Array<UploadedFileCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
