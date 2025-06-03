import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemWhereInput } from './item-where.input';

@ArgsType()
export class DeleteManyItemArgs {
  @Field(() => ItemWhereInput, { nullable: true })
  @Type(() => ItemWhereInput)
  where?: ItemWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
