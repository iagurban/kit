import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadedFileUpdateManyMutationInput } from './uploaded-file-update-many-mutation.input';
import { UploadedFileWhereInput } from './uploaded-file-where.input';

@ArgsType()
export class UpdateManyUploadedFileArgs {
  @Field(() => UploadedFileUpdateManyMutationInput, { nullable: false })
  @Type(() => UploadedFileUpdateManyMutationInput)
  data!: UploadedFileUpdateManyMutationInput;

  @Field(() => UploadedFileWhereInput, { nullable: true })
  @Type(() => UploadedFileWhereInput)
  where?: UploadedFileWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
