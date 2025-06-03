import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemCreateManyImageInput } from './item-create-many-image.input';

@InputType()
export class ItemCreateManyImageInputEnvelope {
  @Field(() => [ItemCreateManyImageInput], { nullable: false })
  @Type(() => ItemCreateManyImageInput)
  data!: Array<ItemCreateManyImageInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
