import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { StoredFileUpdateWithoutUploadsInput } from './stored-file-update-without-uploads.input';
import { StoredFileWhereInput } from './stored-file-where.input';

@InputType()
export class StoredFileUpdateToOneWithWhereWithoutUploadsInput {
  @Field(() => StoredFileWhereInput, { nullable: true })
  @Type(() => StoredFileWhereInput)
  where?: StoredFileWhereInput;

  @Field(() => StoredFileUpdateWithoutUploadsInput, { nullable: false })
  @Type(() => StoredFileUpdateWithoutUploadsInput)
  data!: StoredFileUpdateWithoutUploadsInput;
}
