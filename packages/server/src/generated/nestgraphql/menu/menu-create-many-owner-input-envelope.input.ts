import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuCreateManyOwnerInput } from './menu-create-many-owner.input';

@InputType()
export class MenuCreateManyOwnerInputEnvelope {
  @Field(() => [MenuCreateManyOwnerInput], { nullable: false })
  @Type(() => MenuCreateManyOwnerInput)
  data!: Array<MenuCreateManyOwnerInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
