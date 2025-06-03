import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { StoredFileUpdateManyMutationInput } from './stored-file-update-many-mutation.input';
import { StoredFileWhereInput } from './stored-file-where.input';

@ArgsType()
export class UpdateManyStoredFileArgs {
  @Field(() => StoredFileUpdateManyMutationInput, { nullable: false })
  @Type(() => StoredFileUpdateManyMutationInput)
  data!: StoredFileUpdateManyMutationInput;

  @Field(() => StoredFileWhereInput, { nullable: true })
  @Type(() => StoredFileWhereInput)
  where?: StoredFileWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
