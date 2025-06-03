import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UploadedFileScalarWhereInput } from './uploaded-file-scalar-where.input';
import { UploadedFileUpdateManyMutationInput } from './uploaded-file-update-many-mutation.input';

@InputType()
export class UploadedFileUpdateManyWithWhereWithoutMenuInput {
  @Field(() => UploadedFileScalarWhereInput, { nullable: false })
  @Type(() => UploadedFileScalarWhereInput)
  where!: UploadedFileScalarWhereInput;

  @Field(() => UploadedFileUpdateManyMutationInput, { nullable: false })
  @Type(() => UploadedFileUpdateManyMutationInput)
  data!: UploadedFileUpdateManyMutationInput;
}
