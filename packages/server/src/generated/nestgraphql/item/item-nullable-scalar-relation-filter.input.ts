import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemWhereInput } from './item-where.input';

@InputType()
export class ItemNullableScalarRelationFilter {
  @Field(() => ItemWhereInput, { nullable: true })
  @Type(() => ItemWhereInput)
  is?: ItemWhereInput;

  @Field(() => ItemWhereInput, { nullable: true })
  @Type(() => ItemWhereInput)
  isNot?: ItemWhereInput;
}
