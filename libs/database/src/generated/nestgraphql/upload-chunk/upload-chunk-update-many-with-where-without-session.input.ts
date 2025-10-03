import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadChunkScalarWhereInput } from './upload-chunk-scalar-where.input';
import { UploadChunkUpdateManyMutationInput } from './upload-chunk-update-many-mutation.input';

@InputType()
export class UploadChunkUpdateManyWithWhereWithoutSessionInput {
  @Field(() => UploadChunkScalarWhereInput, { nullable: false })
  @Type(() => UploadChunkScalarWhereInput)
  where!: UploadChunkScalarWhereInput;

  @Field(() => UploadChunkUpdateManyMutationInput, { nullable: false })
  @Type(() => UploadChunkUpdateManyMutationInput)
  data!: UploadChunkUpdateManyMutationInput;
}
