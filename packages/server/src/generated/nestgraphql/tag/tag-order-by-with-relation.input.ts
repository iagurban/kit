import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuOrderByWithRelationInput } from '../menu/menu-order-by-with-relation.input';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class TagOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  menuId?: `${SortOrder}`;

  @Field(() => MenuOrderByWithRelationInput, { nullable: true })
  @Type(() => MenuOrderByWithRelationInput)
  menu?: MenuOrderByWithRelationInput;
}
