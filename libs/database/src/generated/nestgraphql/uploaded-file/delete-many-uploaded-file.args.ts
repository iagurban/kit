import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadedFileWhereInput } from './uploaded-file-where.input';

@ArgsType()
export class DeleteManyUploadedFileArgs {
  @Field(() => UploadedFileWhereInput, { nullable: true })
  @Type(() => UploadedFileWhereInput)
  where?: UploadedFileWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
