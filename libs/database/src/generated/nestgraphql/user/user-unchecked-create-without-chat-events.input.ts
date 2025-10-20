import { Field, InputType } from '@nestjs/graphql';

import { ChatUncheckedCreateNestedManyWithoutOwnerInput } from '../chat/chat-unchecked-create-nested-many-without-owner.input';
import { ChatMemberUncheckedCreateNestedManyWithoutUserInput } from '../chat-member/chat-member-unchecked-create-nested-many-without-user.input';
import { RefreshTokenUncheckedCreateNestedManyWithoutUserInput } from '../refresh-token/refresh-token-unchecked-create-nested-many-without-user.input';
import { StoredFileUncheckedCreateNestedManyWithoutUploadedByUserInput } from '../stored-file/stored-file-unchecked-create-nested-many-without-uploaded-by-user.input';
import { UserChatPermissionsUncheckedCreateNestedManyWithoutUserInput } from '../user-chat-permissions/user-chat-permissions-unchecked-create-nested-many-without-user.input';

@InputType()
export class UserUncheckedCreateWithoutChatEventsInput {
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

  @Field(() => StoredFileUncheckedCreateNestedManyWithoutUploadedByUserInput, { nullable: true })
  uploadedFiles?: StoredFileUncheckedCreateNestedManyWithoutUploadedByUserInput;

  @Field(() => UserChatPermissionsUncheckedCreateNestedManyWithoutUserInput, { nullable: true })
  chatsPermissions?: UserChatPermissionsUncheckedCreateNestedManyWithoutUserInput;

  @Field(() => ChatMemberUncheckedCreateNestedManyWithoutUserInput, { nullable: true })
  chatsMmbership?: ChatMemberUncheckedCreateNestedManyWithoutUserInput;

  @Field(() => ChatUncheckedCreateNestedManyWithoutOwnerInput, { nullable: true })
  ownChats?: ChatUncheckedCreateNestedManyWithoutOwnerInput;

  @Field(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInput, { nullable: true })
  RefreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput;
}
