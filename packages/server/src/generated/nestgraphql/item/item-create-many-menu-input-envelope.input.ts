import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemCreateManyMenuInput } from './item-create-many-menu.input';

@InputType()
export class ItemCreateManyMenuInputEnvelope {
  @Field(() => [ItemCreateManyMenuInput], { nullable: false })
  @Type(() => ItemCreateManyMenuInput)
  data!: Array<ItemCreateManyMenuInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
