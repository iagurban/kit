import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemUpdateWithoutChildrenInput } from './item-update-without-children.input';
import { ItemWhereInput } from './item-where.input';

@InputType()
export class ItemUpdateToOneWithWhereWithoutChildrenInput {
  @Field(() => ItemWhereInput, { nullable: true })
  @Type(() => ItemWhereInput)
  where?: ItemWhereInput;

  @Field(() => ItemUpdateWithoutChildrenInput, { nullable: false })
  @Type(() => ItemUpdateWithoutChildrenInput)
  data!: ItemUpdateWithoutChildrenInput;
}
