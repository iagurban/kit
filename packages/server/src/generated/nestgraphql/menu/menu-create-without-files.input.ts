import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemCreateNestedManyWithoutMenuInput } from '../item/item-create-nested-many-without-menu.input';
import { TagCreateNestedManyWithoutMenuInput } from '../tag/tag-create-nested-many-without-menu.input';
import { UserCreateNestedOneWithoutMenusInput } from '../user/user-create-nested-one-without-menus.input';

@InputType()
export class MenuCreateWithoutFilesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => UserCreateNestedOneWithoutMenusInput, { nullable: false })
  owner!: UserCreateNestedOneWithoutMenusInput;

  @Field(() => ItemCreateNestedManyWithoutMenuInput, { nullable: true })
  @Type(() => ItemCreateNestedManyWithoutMenuInput)
  items?: ItemCreateNestedManyWithoutMenuInput;

  @Field(() => TagCreateNestedManyWithoutMenuInput, { nullable: true })
  tags?: TagCreateNestedManyWithoutMenuInput;
}
