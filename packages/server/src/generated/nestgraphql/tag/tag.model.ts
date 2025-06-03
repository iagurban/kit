import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Menu } from '../menu/menu.model';

@ObjectType()
export class Tag {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  menuId!: string;

  @Field(() => Menu, { nullable: false })
  menu?: Menu;
}
