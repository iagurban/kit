import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuUpdateWithoutItemsInput } from './menu-update-without-items.input';
import { MenuWhereInput } from './menu-where.input';

@InputType()
export class MenuUpdateToOneWithWhereWithoutItemsInput {
  @Field(() => MenuWhereInput, { nullable: true })
  @Type(() => MenuWhereInput)
  where?: MenuWhereInput;

  @Field(() => MenuUpdateWithoutItemsInput, { nullable: false })
  @Type(() => MenuUpdateWithoutItemsInput)
  data!: MenuUpdateWithoutItemsInput;
}
