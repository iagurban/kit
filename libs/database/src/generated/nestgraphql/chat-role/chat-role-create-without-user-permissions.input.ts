import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatCreateNestedManyWithoutDefaultRoleInput } from '../chat/chat-create-nested-many-without-default-role.input';
import { ChatCreateNestedOneWithoutRolesInput } from '../chat/chat-create-nested-one-without-roles.input';
import { ChatRoleCreatetagsInput } from './chat-role-createtags.input';

@InputType()
export class ChatRoleCreateWithoutUserPermissionsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ChatRoleCreatetagsInput, { nullable: true })
  tags?: ChatRoleCreatetagsInput;

  @Field(() => GraphQLJSON, { nullable: false })
  permissions!: any;

  @Field(() => ChatCreateNestedOneWithoutRolesInput, { nullable: false })
  chat!: ChatCreateNestedOneWithoutRolesInput;

  @Field(() => ChatCreateNestedManyWithoutDefaultRoleInput, { nullable: true })
  isDefaultForChats?: ChatCreateNestedManyWithoutDefaultRoleInput;
}
