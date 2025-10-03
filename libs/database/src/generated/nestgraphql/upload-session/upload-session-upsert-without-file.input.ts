import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadSessionCreateWithoutFileInput } from './upload-session-create-without-file.input';
import { UploadSessionUpdateWithoutFileInput } from './upload-session-update-without-file.input';
import { UploadSessionWhereInput } from './upload-session-where.input';

@InputType()
export class UploadSessionUpsertWithoutFileInput {
  @Field(() => UploadSessionUpdateWithoutFileInput, { nullable: false })
  @Type(() => UploadSessionUpdateWithoutFileInput)
  update!: UploadSessionUpdateWithoutFileInput;

  @Field(() => UploadSessionCreateWithoutFileInput, { nullable: false })
  @Type(() => UploadSessionCreateWithoutFileInput)
  create!: UploadSessionCreateWithoutFileInput;

  @Field(() => UploadSessionWhereInput, { nullable: true })
  @Type(() => UploadSessionWhereInput)
  where?: UploadSessionWhereInput;
}
