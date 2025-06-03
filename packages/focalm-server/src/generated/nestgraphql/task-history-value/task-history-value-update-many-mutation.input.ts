import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { EnumTaskHistoryKeyFieldUpdateOperationsInput } from '../prisma/enum-task-history-key-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class TaskHistoryValueUpdateManyMutationInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  taskId?: StringFieldUpdateOperationsInput;

  @Field(() => EnumTaskHistoryKeyFieldUpdateOperationsInput, { nullable: true })
  key?: EnumTaskHistoryKeyFieldUpdateOperationsInput;

  @Field(() => GraphQLJSON, { nullable: true })
  value?: any;
}
