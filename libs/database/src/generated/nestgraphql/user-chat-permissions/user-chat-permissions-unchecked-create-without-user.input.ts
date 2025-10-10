import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class UserChatPermissionsUncheckedCreateWithoutUserInput {
  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => String, { nullable: true })
  roleId?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  permissions?: any;
}
