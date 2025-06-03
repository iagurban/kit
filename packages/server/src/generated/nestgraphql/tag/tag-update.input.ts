import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuUpdateOneRequiredWithoutTagsNestedInput } from '../menu/menu-update-one-required-without-tags-nested.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class TagUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => MenuUpdateOneRequiredWithoutTagsNestedInput, { nullable: true })
  @Type(() => MenuUpdateOneRequiredWithoutTagsNestedInput)
  menu?: MenuUpdateOneRequiredWithoutTagsNestedInput;
}
