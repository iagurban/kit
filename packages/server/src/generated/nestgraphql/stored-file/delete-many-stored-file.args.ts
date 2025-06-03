import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { StoredFileWhereInput } from './stored-file-where.input';

@ArgsType()
export class DeleteManyStoredFileArgs {
  @Field(() => StoredFileWhereInput, { nullable: true })
  @Type(() => StoredFileWhereInput)
  where?: StoredFileWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
