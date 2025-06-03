import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemScalarWhereInput } from './item-scalar-where.input';
import { ItemUpdateManyMutationInput } from './item-update-many-mutation.input';

@InputType()
export class ItemUpdateManyWithWhereWithoutParentInput {
  @Field(() => ItemScalarWhereInput, { nullable: false })
  @Type(() => ItemScalarWhereInput)
  where!: ItemScalarWhereInput;

  @Field(() => ItemUpdateManyMutationInput, { nullable: false })
  @Type(() => ItemUpdateManyMutationInput)
  data!: ItemUpdateManyMutationInput;
}
