import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { EnumTaskHistoryKeyFieldUpdateOperationsInput } from '../prisma/enum-task-history-key-field-update-operations.input';
import { EnumTaskHistoryOperationFieldUpdateOperationsInput } from '../prisma/enum-task-history-operation-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class TaskHistoryValueUncheckedUpdateWithoutTaskInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  groupId?: StringFieldUpdateOperationsInput;

  @Field(() => EnumTaskHistoryKeyFieldUpdateOperationsInput, { nullable: true })
  key?: EnumTaskHistoryKeyFieldUpdateOperationsInput;

  @Field(() => EnumTaskHistoryOperationFieldUpdateOperationsInput, { nullable: true })
  op?: EnumTaskHistoryOperationFieldUpdateOperationsInput;

  @Field(() => GraphQLJSON, { nullable: true })
  value?: any;
}
