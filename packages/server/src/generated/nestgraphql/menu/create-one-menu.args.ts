import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuCreateInput } from './menu-create.input';

@ArgsType()
export class CreateOneMenuArgs {
  @Field(() => MenuCreateInput, { nullable: false })
  @Type(() => MenuCreateInput)
  data!: MenuCreateInput;
}
