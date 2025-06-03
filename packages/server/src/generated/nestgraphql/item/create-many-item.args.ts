import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemCreateManyInput } from './item-create-many.input';

@ArgsType()
export class CreateManyItemArgs {
  @Field(() => [ItemCreateManyInput], { nullable: false })
  @Type(() => ItemCreateManyInput)
  data!: Array<ItemCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
