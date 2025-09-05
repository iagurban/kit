import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { UploadedFileOrderByRelevanceFieldEnum } from './uploaded-file-order-by-relevance-field.enum';

@InputType()
export class UploadedFileOrderByRelevanceInput {
  @Field(() => [UploadedFileOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${UploadedFileOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
