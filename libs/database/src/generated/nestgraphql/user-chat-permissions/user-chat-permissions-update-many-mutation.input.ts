import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class UserChatPermissionsUpdateManyMutationInput {
  @Field(() => GraphQLJSON, { nullable: true })
  permissions?: any;
}
