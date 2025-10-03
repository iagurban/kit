import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadSessionUpdateManyMutationInput } from './upload-session-update-many-mutation.input';
import { UploadSessionWhereInput } from './upload-session-where.input';

@ArgsType()
export class UpdateManyUploadSessionArgs {
  @Field(() => UploadSessionUpdateManyMutationInput, { nullable: false })
  @Type(() => UploadSessionUpdateManyMutationInput)
  data!: UploadSessionUpdateManyMutationInput;

  @Field(() => UploadSessionWhereInput, { nullable: true })
  @Type(() => UploadSessionWhereInput)
  where?: UploadSessionWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
