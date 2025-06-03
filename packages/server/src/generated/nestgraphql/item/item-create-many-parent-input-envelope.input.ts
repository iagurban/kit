import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemCreateManyParentInput } from './item-create-many-parent.input';

@InputType()
export class ItemCreateManyParentInputEnvelope {
  @Field(() => [ItemCreateManyParentInput], { nullable: false })
  @Type(() => ItemCreateManyParentInput)
  data!: Array<ItemCreateManyParentInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
