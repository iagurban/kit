import { Field, InputType } from '@nestjs/graphql';

import { TaskUpdateOneRequiredWithoutRelationsDstNestedInput } from '../task/task-update-one-required-without-relations-dst-nested.input';
import { TaskUpdateOneRequiredWithoutRelationsSrcNestedInput } from '../task/task-update-one-required-without-relations-src-nested.input';

@InputType()
export class TaskToTaskRelationUpdateWithoutTypeInput {
  @Field(() => TaskUpdateOneRequiredWithoutRelationsSrcNestedInput, { nullable: true })
  src?: TaskUpdateOneRequiredWithoutRelationsSrcNestedInput;

  @Field(() => TaskUpdateOneRequiredWithoutRelationsDstNestedInput, { nullable: true })
  dst?: TaskUpdateOneRequiredWithoutRelationsDstNestedInput;
}
