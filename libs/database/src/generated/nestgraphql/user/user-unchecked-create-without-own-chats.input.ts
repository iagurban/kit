import { Field, InputType } from '@nestjs/graphql';

import { ChatEventUncheckedCreateNestedManyWithoutAuthorInput } from '../chat-event/chat-event-unchecked-create-nested-many-without-author.input';
import { ChatMemberUncheckedCreateNestedManyWithoutUserInput } from '../chat-member/chat-member-unchecked-create-nested-many-without-user.input';
import { RefreshTokenUncheckedCreateNestedManyWithoutUserInput } from '../refresh-token/refresh-token-unchecked-create-nested-many-without-user.input';
import { StoredFileUncheckedCreateNestedManyWithoutUploadedByUserInput } from '../stored-file/stored-file-unchecked-create-nested-many-without-uploaded-by-user.input';
import { UserChatPermissionsUncheckedCreateNestedManyWithoutUserInput } from '../user-chat-permissions/user-chat-permissions-unchecked-create-nested-many-without-user.input';

@InputType()
export class UserUncheckedCreateWithoutOwnChatsInput {
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

  @Field(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInput, { nullable: true })
  refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput;

  @Field(() => ChatEventUncheckedCreateNestedManyWithoutAuthorInput, { nullable: true })
  chatEvents?: ChatEventUncheckedCreateNestedManyWithoutAuthorInput;

  @Field(() => UserChatPermissionsUncheckedCreateNestedManyWithoutUserInput, { nullable: true })
  chatsPermissions?: UserChatPermissionsUncheckedCreateNestedManyWithoutUserInput;

  @Field(() => ChatMemberUncheckedCreateNestedManyWithoutUserInput, { nullable: true })
  chatsMmbership?: ChatMemberUncheckedCreateNestedManyWithoutUserInput;
}
