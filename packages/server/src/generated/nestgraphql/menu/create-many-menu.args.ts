import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuCreateManyInput } from './menu-create-many.input';

@ArgsType()
export class CreateManyMenuArgs {
  @Field(() => [MenuCreateManyInput], { nullable: false })
  @Type(() => MenuCreateManyInput)
  data!: Array<MenuCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
