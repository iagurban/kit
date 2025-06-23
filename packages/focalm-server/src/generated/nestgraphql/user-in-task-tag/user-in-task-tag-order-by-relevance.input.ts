import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { UserInTaskTagOrderByRelevanceFieldEnum } from './user-in-task-tag-order-by-relevance-field.enum';

@InputType()
export class UserInTaskTagOrderByRelevanceInput {
  @Field(() => [UserInTaskTagOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${UserInTaskTagOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
