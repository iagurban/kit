import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuCreateWithoutTagsInput } from './menu-create-without-tags.input';
import { MenuUpdateWithoutTagsInput } from './menu-update-without-tags.input';
import { MenuWhereInput } from './menu-where.input';

@InputType()
export class MenuUpsertWithoutTagsInput {
  @Field(() => MenuUpdateWithoutTagsInput, { nullable: false })
  @Type(() => MenuUpdateWithoutTagsInput)
  update!: MenuUpdateWithoutTagsInput;

  @Field(() => MenuCreateWithoutTagsInput, { nullable: false })
  @Type(() => MenuCreateWithoutTagsInput)
  create!: MenuCreateWithoutTagsInput;

  @Field(() => MenuWhereInput, { nullable: true })
  @Type(() => MenuWhereInput)
  where?: MenuWhereInput;
}
