import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { StoredFileCreateInput } from './stored-file-create.input';

@ArgsType()
export class CreateOneStoredFileArgs {
  @Field(() => StoredFileCreateInput, { nullable: false })
  @Type(() => StoredFileCreateInput)
  data!: StoredFileCreateInput;
}
