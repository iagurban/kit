import { Field, InputType } from '@nestjs/graphql';

import { TaskUpdateOneRequiredWithoutRelationsSrcNestedInput } from '../task/task-update-one-required-without-relations-src-nested.input';
import { TaskToTaskRelationTypeUpdateOneRequiredWithoutRelationsNestedInput } from '../task-to-task-relation-type/task-to-task-relation-type-update-one-required-without-relations-nested.input';

@InputType()
export class TaskToTaskRelationUpdateWithoutDstInput {
  @Field(() => TaskUpdateOneRequiredWithoutRelationsSrcNestedInput, { nullable: true })
  src?: TaskUpdateOneRequiredWithoutRelationsSrcNestedInput;

  @Field(() => TaskToTaskRelationTypeUpdateOneRequiredWithoutRelationsNestedInput, { nullable: true })
  type?: TaskToTaskRelationTypeUpdateOneRequiredWithoutRelationsNestedInput;
}
