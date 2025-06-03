import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuUpdateOneRequiredWithoutItemsNestedInput } from '../menu/menu-update-one-required-without-items-nested.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableDecimalFieldUpdateOperationsInput } from '../prisma/nullable-decimal-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { ItemUpdateManyWithoutParentNestedInput } from './item-update-many-without-parent-nested.input';
import { ItemUpdateOneWithoutChildrenNestedInput } from './item-update-one-without-children-nested.input';

@InputType()
export class ItemUpdateWithoutImageInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  orderKey?: StringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  title?: NullableStringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  description?: NullableStringFieldUpdateOperationsInput;

  @Field(() => NullableDecimalFieldUpdateOperationsInput, { nullable: true })
  @Type(() => NullableDecimalFieldUpdateOperationsInput)
  price?: NullableDecimalFieldUpdateOperationsInput;

  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  archived?: BoolFieldUpdateOperationsInput;

  @Field(() => MenuUpdateOneRequiredWithoutItemsNestedInput, { nullable: true })
  @Type(() => MenuUpdateOneRequiredWithoutItemsNestedInput)
  menu?: MenuUpdateOneRequiredWithoutItemsNestedInput;

  @Field(() => ItemUpdateOneWithoutChildrenNestedInput, { nullable: true })
  @Type(() => ItemUpdateOneWithoutChildrenNestedInput)
  parent?: ItemUpdateOneWithoutChildrenNestedInput;

  @Field(() => ItemUpdateManyWithoutParentNestedInput, { nullable: true })
  @Type(() => ItemUpdateManyWithoutParentNestedInput)
  children?: ItemUpdateManyWithoutParentNestedInput;
}
