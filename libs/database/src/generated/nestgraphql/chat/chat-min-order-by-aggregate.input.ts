import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ChatMinOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  title?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  bio?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  avatar?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  ownerId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  defaultRoleId?: `${SortOrder}`;
}
