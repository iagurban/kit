import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MenuUpdateInput } from './menu-update.input';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@ArgsType()
export class UpdateOneMenuArgs {
  @Field(() => MenuUpdateInput, { nullable: false })
  @Type(() => MenuUpdateInput)
  data!: MenuUpdateInput;

  @Field(() => MenuWhereUniqueInput, { nullable: false })
  @Type(() => MenuWhereUniqueInput)
  where!: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;
}
