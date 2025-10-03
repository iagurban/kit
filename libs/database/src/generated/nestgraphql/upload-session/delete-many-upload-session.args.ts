import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadSessionWhereInput } from './upload-session-where.input';

@ArgsType()
export class DeleteManyUploadSessionArgs {
  @Field(() => UploadSessionWhereInput, { nullable: true })
  @Type(() => UploadSessionWhereInput)
  where?: UploadSessionWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
