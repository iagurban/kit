import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { RefreshTokenOrderByRelevanceFieldEnum } from './refresh-token-order-by-relevance-field.enum';

@InputType()
export class RefreshTokenOrderByRelevanceInput {
  @Field(() => [RefreshTokenOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${RefreshTokenOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
