import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadSessionCreateManyInput } from './upload-session-create-many.input';

@ArgsType()
export class CreateManyUploadSessionArgs {
  @Field(() => [UploadSessionCreateManyInput], { nullable: false })
  @Type(() => UploadSessionCreateManyInput)
  data!: Array<UploadSessionCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
