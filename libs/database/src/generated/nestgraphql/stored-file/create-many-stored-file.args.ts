import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { StoredFileCreateManyInput } from './stored-file-create-many.input';

@ArgsType()
export class CreateManyStoredFileArgs {
  @Field(() => [StoredFileCreateManyInput], { nullable: false })
  @Type(() => StoredFileCreateManyInput)
  data!: Array<StoredFileCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
