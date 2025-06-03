import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemUpdateManyMutationInput } from './item-update-many-mutation.input';
import { ItemWhereInput } from './item-where.input';

@ArgsType()
export class UpdateManyItemArgs {
  @Field(() => ItemUpdateManyMutationInput, { nullable: false })
  @Type(() => ItemUpdateManyMutationInput)
  data!: ItemUpdateManyMutationInput;

  @Field(() => ItemWhereInput, { nullable: true })
  @Type(() => ItemWhereInput)
  where?: ItemWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
