import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class UserChatPermissionsCreateManyRoleInput {
  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  permissions?: any;
}
