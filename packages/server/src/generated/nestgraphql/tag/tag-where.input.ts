import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuScalarRelationFilter } from '../menu/menu-scalar-relation-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class TagWhereInput {
  @Field(() => [TagWhereInput], { nullable: true })
  AND?: Array<TagWhereInput>;

  @Field(() => [TagWhereInput], { nullable: true })
  OR?: Array<TagWhereInput>;

  @Field(() => [TagWhereInput], { nullable: true })
  NOT?: Array<TagWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  menuId?: UuidFilter;

  @Field(() => MenuScalarRelationFilter, { nullable: true })
  @Type(() => MenuScalarRelationFilter)
  menu?: MenuScalarRelationFilter;
}
