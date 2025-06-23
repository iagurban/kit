import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { ParticipantRoleOrderByRelevanceFieldEnum } from './participant-role-order-by-relevance-field.enum';

@InputType()
export class ParticipantRoleOrderByRelevanceInput {
  @Field(() => [ParticipantRoleOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${ParticipantRoleOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
