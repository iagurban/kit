import { Field, InputType } from '@nestjs/graphql';

import { TaskHistoryOperation } from './task-history-operation.enum';

@InputType()
export class EnumTaskHistoryOperationFieldUpdateOperationsInput {
  @Field(() => TaskHistoryOperation, { nullable: true })
  set?: `${TaskHistoryOperation}`;
}
