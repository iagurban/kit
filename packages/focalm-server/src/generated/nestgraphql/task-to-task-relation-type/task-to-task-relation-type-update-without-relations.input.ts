import { Field, InputType } from '@nestjs/graphql';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { ProjectUpdateOneRequiredWithoutRelationTypesNestedInput } from '../project/project-update-one-required-without-relation-types-nested.input';

@InputType()
export class TaskToTaskRelationTypeUpdateWithoutRelationsInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  forward?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  inverse?: StringFieldUpdateOperationsInput;

  @Field(() => ProjectUpdateOneRequiredWithoutRelationTypesNestedInput, { nullable: true })
  project?: ProjectUpdateOneRequiredWithoutRelationTypesNestedInput;
}
