import { Field, InputType } from '@nestjs/graphql';

import { ChatEventUncheckedCreateNestedManyWithoutAuthorInput } from '../chat-event/chat-event-unchecked-create-nested-many-without-author.input';
import { StoredFileUncheckedCreateNestedManyWithoutUploadedByUserInput } from '../stored-file/stored-file-unchecked-create-nested-many-without-uploaded-by-user.input';

@InputType()
export class UserUncheckedCreateWithoutRefreshTokensInput {
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

  @Field(() => StoredFileUncheckedCreateNestedManyWithoutUploadedByUserInput, { nullable: true })
  uploadedFiles?: StoredFileUncheckedCreateNestedManyWithoutUploadedByUserInput;

  @Field(() => ChatEventUncheckedCreateNestedManyWithoutAuthorInput, { nullable: true })
  chatEvents?: ChatEventUncheckedCreateNestedManyWithoutAuthorInput;
}
