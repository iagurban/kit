import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatUncheckedCreateNestedManyWithoutDefaultRoleInput } from '../chat/chat-unchecked-create-nested-many-without-default-role.input';
import { ChatRoleCreatetagsInput } from './chat-role-createtags.input';

@InputType()
export class ChatRoleUncheckedCreateWithoutUserPermissionsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ChatRoleCreatetagsInput, { nullable: true })
  tags?: ChatRoleCreatetagsInput;

  @Field(() => GraphQLJSON, { nullable: false })
  permissions!: any;

  @Field(() => ChatUncheckedCreateNestedManyWithoutDefaultRoleInput, { nullable: true })
  isDefaultForChats?: ChatUncheckedCreateNestedManyWithoutDefaultRoleInput;
}
