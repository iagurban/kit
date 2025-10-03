import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadSessionCreateInput } from './upload-session-create.input';

@ArgsType()
export class CreateOneUploadSessionArgs {
  @Field(() => UploadSessionCreateInput, { nullable: false })
  @Type(() => UploadSessionCreateInput)
  data!: UploadSessionCreateInput;
}
