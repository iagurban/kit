import { Field, InputType } from '@nestjs/graphql';

import { ChatEventCreateNestedManyWithoutAuthorInput } from '../chat-event/chat-event-create-nested-many-without-author.input';
import { RefreshTokenCreateNestedManyWithoutUserInput } from '../refresh-token/refresh-token-create-nested-many-without-user.input';
import { StoredFileCreateNestedManyWithoutUploadedByUserInput } from '../stored-file/stored-file-create-nested-many-without-uploaded-by-user.input';

@InputType()
export class UserCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  abbrev?: string;

  @Field(() => String, { nullable: false })
  passwordHash!: string;

  @Field(() => StoredFileCreateNestedManyWithoutUploadedByUserInput, { nullable: true })
  uploadedFiles?: StoredFileCreateNestedManyWithoutUploadedByUserInput;

  @Field(() => RefreshTokenCreateNestedManyWithoutUserInput, { nullable: true })
  refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput;

  @Field(() => ChatEventCreateNestedManyWithoutAuthorInput, { nullable: true })
  chatEvents?: ChatEventCreateNestedManyWithoutAuthorInput;
}
