import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class UserChatPermissionsUncheckedUpdateWithoutChatInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  userId?: StringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  roleId?: NullableStringFieldUpdateOperationsInput;

  @Field(() => GraphQLJSON, { nullable: true })
  permissions?: any;
}
