import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { StoredFileOrderByRelevanceFieldEnum } from './stored-file-order-by-relevance-field.enum';

@InputType()
export class StoredFileOrderByRelevanceInput {
  @Field(() => [StoredFileOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${StoredFileOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
