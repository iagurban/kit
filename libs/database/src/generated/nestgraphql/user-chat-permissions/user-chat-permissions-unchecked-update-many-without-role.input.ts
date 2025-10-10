import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class UserChatPermissionsUncheckedUpdateManyWithoutRoleInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  userId?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  chatId?: StringFieldUpdateOperationsInput;

  @Field(() => GraphQLJSON, { nullable: true })
  permissions?: any;
}
