import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadedFileUpdateWithoutUsingItemsInput } from './uploaded-file-update-without-using-items.input';
import { UploadedFileWhereInput } from './uploaded-file-where.input';

@InputType()
export class UploadedFileUpdateToOneWithWhereWithoutUsingItemsInput {
  @Field(() => UploadedFileWhereInput, { nullable: true })
  @Type(() => UploadedFileWhereInput)
  where?: UploadedFileWhereInput;

  @Field(() => UploadedFileUpdateWithoutUsingItemsInput, { nullable: false })
  @Type(() => UploadedFileUpdateWithoutUsingItemsInput)
  data!: UploadedFileUpdateWithoutUsingItemsInput;
}
