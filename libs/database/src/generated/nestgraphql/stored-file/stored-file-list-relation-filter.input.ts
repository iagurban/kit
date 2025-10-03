import { Field, InputType } from '@nestjs/graphql';

import { StoredFileWhereInput } from './stored-file-where.input';

@InputType()
export class StoredFileListRelationFilter {
  @Field(() => StoredFileWhereInput, { nullable: true })
  every?: StoredFileWhereInput;

  @Field(() => StoredFileWhereInput, { nullable: true })
  some?: StoredFileWhereInput;

  @Field(() => StoredFileWhereInput, { nullable: true })
  none?: StoredFileWhereInput;
}
