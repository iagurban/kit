import { Field, InputType } from '@nestjs/graphql';

import { TaskHistoryKey } from './task-history-key.enum';

@InputType()
export class EnumTaskHistoryKeyFieldUpdateOperationsInput {
  @Field(() => TaskHistoryKey, { nullable: true })
  set?: `${TaskHistoryKey}`;
}
