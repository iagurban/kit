import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuCreateNestedOneWithoutTagsInput } from '../menu/menu-create-nested-one-without-tags.input';

@InputType()
export class TagCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => MenuCreateNestedOneWithoutTagsInput, { nullable: false })
  @Type(() => MenuCreateNestedOneWithoutTagsInput)
  menu!: MenuCreateNestedOneWithoutTagsInput;
}
