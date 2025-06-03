import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemWhereInput } from './item-where.input';

@InputType()
export class ItemListRelationFilter {
  @Field(() => ItemWhereInput, { nullable: true })
  @Type(() => ItemWhereInput)
  every?: ItemWhereInput;

  @Field(() => ItemWhereInput, { nullable: true })
  @Type(() => ItemWhereInput)
  some?: ItemWhereInput;

  @Field(() => ItemWhereInput, { nullable: true })
  @Type(() => ItemWhereInput)
  none?: ItemWhereInput;
}
