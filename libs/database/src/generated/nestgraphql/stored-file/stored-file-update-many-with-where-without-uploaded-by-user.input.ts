import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { StoredFileScalarWhereInput } from './stored-file-scalar-where.input';
import { StoredFileUpdateManyMutationInput } from './stored-file-update-many-mutation.input';

@InputType()
export class StoredFileUpdateManyWithWhereWithoutUploadedByUserInput {
  @Field(() => StoredFileScalarWhereInput, { nullable: false })
  @Type(() => StoredFileScalarWhereInput)
  where!: StoredFileScalarWhereInput;

  @Field(() => StoredFileUpdateManyMutationInput, { nullable: false })
  @Type(() => StoredFileUpdateManyMutationInput)
  data!: StoredFileUpdateManyMutationInput;
}
