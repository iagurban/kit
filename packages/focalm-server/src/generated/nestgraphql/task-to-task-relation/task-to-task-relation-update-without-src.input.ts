import { Field, InputType } from '@nestjs/graphql';

import { TaskUpdateOneRequiredWithoutRelationsDstNestedInput } from '../task/task-update-one-required-without-relations-dst-nested.input';
import { TaskToTaskRelationTypeUpdateOneRequiredWithoutRelationsNestedInput } from '../task-to-task-relation-type/task-to-task-relation-type-update-one-required-without-relations-nested.input';

@InputType()
export class TaskToTaskRelationUpdateWithoutSrcInput {
  @Field(() => TaskUpdateOneRequiredWithoutRelationsDstNestedInput, { nullable: true })
  dst?: TaskUpdateOneRequiredWithoutRelationsDstNestedInput;

  @Field(() => TaskToTaskRelationTypeUpdateOneRequiredWithoutRelationsNestedInput, { nullable: true })
  type?: TaskToTaskRelationTypeUpdateOneRequiredWithoutRelationsNestedInput;
}
