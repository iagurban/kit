import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { UserInProjectOrderByRelevanceFieldEnum } from './user-in-project-order-by-relevance-field.enum';

@InputType()
export class UserInProjectOrderByRelevanceInput {
  @Field(() => [UserInProjectOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${UserInProjectOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
