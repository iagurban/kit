import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadSessionUpdateWithoutFileInput } from './upload-session-update-without-file.input';
import { UploadSessionWhereInput } from './upload-session-where.input';

@InputType()
export class UploadSessionUpdateToOneWithWhereWithoutFileInput {
  @Field(() => UploadSessionWhereInput, { nullable: true })
  @Type(() => UploadSessionWhereInput)
  where?: UploadSessionWhereInput;

  @Field(() => UploadSessionUpdateWithoutFileInput, { nullable: false })
  @Type(() => UploadSessionUpdateWithoutFileInput)
  data!: UploadSessionUpdateWithoutFileInput;
}
