import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { UploadChunkOrderByRelevanceFieldEnum } from './upload-chunk-order-by-relevance-field.enum';

@InputType()
export class UploadChunkOrderByRelevanceInput {
  @Field(() => [UploadChunkOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${UploadChunkOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
