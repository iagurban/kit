import { Field, InputType } from '@nestjs/graphql';

import { TaskState } from './task-state.enum';

@InputType()
export class EnumTaskStateFieldUpdateOperationsInput {
  @Field(() => TaskState, { nullable: true })
  set?: `${TaskState}`;
}
