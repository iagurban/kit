import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { UserInTaskOrderByWithRelationInput } from '../user-in-task/user-in-task-order-by-with-relation.input';

@InputType()
export class UserInTaskTagOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  userInTaskId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  tag?: `${SortOrder}`;

  @Field(() => UserInTaskOrderByWithRelationInput, { nullable: true })
  userInTask?: UserInTaskOrderByWithRelationInput;
}
