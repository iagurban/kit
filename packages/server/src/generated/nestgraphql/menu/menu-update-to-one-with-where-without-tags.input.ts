import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuUpdateWithoutTagsInput } from './menu-update-without-tags.input';
import { MenuWhereInput } from './menu-where.input';

@InputType()
export class MenuUpdateToOneWithWhereWithoutTagsInput {
  @Field(() => MenuWhereInput, { nullable: true })
  @Type(() => MenuWhereInput)
  where?: MenuWhereInput;

  @Field(() => MenuUpdateWithoutTagsInput, { nullable: false })
  @Type(() => MenuUpdateWithoutTagsInput)
  data!: MenuUpdateWithoutTagsInput;
}
