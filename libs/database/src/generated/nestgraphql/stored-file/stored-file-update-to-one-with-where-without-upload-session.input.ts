import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { StoredFileUpdateWithoutUploadSessionInput } from './stored-file-update-without-upload-session.input';
import { StoredFileWhereInput } from './stored-file-where.input';

@InputType()
export class StoredFileUpdateToOneWithWhereWithoutUploadSessionInput {
  @Field(() => StoredFileWhereInput, { nullable: true })
  @Type(() => StoredFileWhereInput)
  where?: StoredFileWhereInput;

  @Field(() => StoredFileUpdateWithoutUploadSessionInput, { nullable: false })
  @Type(() => StoredFileUpdateWithoutUploadSessionInput)
  data!: StoredFileUpdateWithoutUploadSessionInput;
}
