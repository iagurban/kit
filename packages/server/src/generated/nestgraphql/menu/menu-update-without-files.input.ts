import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemUpdateManyWithoutMenuNestedInput } from '../item/item-update-many-without-menu-nested.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TagUpdateManyWithoutMenuNestedInput } from '../tag/tag-update-many-without-menu-nested.input';
import { UserUpdateOneRequiredWithoutMenusNestedInput } from '../user/user-update-one-required-without-menus-nested.input';

@InputType()
export class MenuUpdateWithoutFilesInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  title?: StringFieldUpdateOperationsInput;

  @Field(() => UserUpdateOneRequiredWithoutMenusNestedInput, { nullable: true })
  owner?: UserUpdateOneRequiredWithoutMenusNestedInput;

  @Field(() => ItemUpdateManyWithoutMenuNestedInput, { nullable: true })
  @Type(() => ItemUpdateManyWithoutMenuNestedInput)
  items?: ItemUpdateManyWithoutMenuNestedInput;

  @Field(() => TagUpdateManyWithoutMenuNestedInput, { nullable: true })
  tags?: TagUpdateManyWithoutMenuNestedInput;
}
