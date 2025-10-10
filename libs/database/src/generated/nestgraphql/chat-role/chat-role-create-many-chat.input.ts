import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatRoleCreatetagsInput } from './chat-role-createtags.input';

@InputType()
export class ChatRoleCreateManyChatInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ChatRoleCreatetagsInput, { nullable: true })
  tags?: ChatRoleCreatetagsInput;

  @Field(() => GraphQLJSON, { nullable: false })
  permissions!: any;
}
