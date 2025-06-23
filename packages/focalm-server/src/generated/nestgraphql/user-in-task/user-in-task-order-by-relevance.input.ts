import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { UserInTaskOrderByRelevanceFieldEnum } from './user-in-task-order-by-relevance-field.enum';

@InputType()
export class UserInTaskOrderByRelevanceInput {
  @Field(() => [UserInTaskOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${UserInTaskOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
