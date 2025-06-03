import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemCreateInput } from './item-create.input';

@ArgsType()
export class CreateOneItemArgs {
  @Field(() => ItemCreateInput, { nullable: false })
  @Type(() => ItemCreateInput)
  data!: ItemCreateInput;
}
