import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UserInTaskTagMinOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  userInTaskId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  roleId?: `${SortOrder}`;
}
