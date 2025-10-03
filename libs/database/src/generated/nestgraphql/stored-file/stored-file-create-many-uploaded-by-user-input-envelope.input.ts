import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { StoredFileCreateManyUploadedByUserInput } from './stored-file-create-many-uploaded-by-user.input';

@InputType()
export class StoredFileCreateManyUploadedByUserInputEnvelope {
  @Field(() => [StoredFileCreateManyUploadedByUserInput], { nullable: false })
  @Type(() => StoredFileCreateManyUploadedByUserInput)
  data!: Array<StoredFileCreateManyUploadedByUserInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
