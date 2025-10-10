import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class UserChatPermissionsCreateManyUserInput {
  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => String, { nullable: true })
  roleId?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  permissions?: any;
}
