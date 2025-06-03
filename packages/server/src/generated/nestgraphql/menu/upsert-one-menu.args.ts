import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MenuCreateInput } from './menu-create.input';
import { MenuUpdateInput } from './menu-update.input';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@ArgsType()
export class UpsertOneMenuArgs {
  @Field(() => MenuWhereUniqueInput, { nullable: false })
  @Type(() => MenuWhereUniqueInput)
  where!: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;

  @Field(() => MenuCreateInput, { nullable: false })
  @Type(() => MenuCreateInput)
  create!: MenuCreateInput;

  @Field(() => MenuUpdateInput, { nullable: false })
  @Type(() => MenuUpdateInput)
  update!: MenuUpdateInput;
}
