import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { UploadSessionOrderByRelevanceFieldEnum } from './upload-session-order-by-relevance-field.enum';

@InputType()
export class UploadSessionOrderByRelevanceInput {
  @Field(() => [UploadSessionOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${UploadSessionOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
