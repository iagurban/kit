import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { ProjectOrderByRelevanceFieldEnum } from './project-order-by-relevance-field.enum';

@InputType()
export class ProjectOrderByRelevanceInput {
  @Field(() => [ProjectOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${ProjectOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
