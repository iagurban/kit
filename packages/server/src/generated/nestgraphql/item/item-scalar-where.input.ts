import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { BoolFilter } from '../prisma/bool-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DecimalNullableFilter } from '../prisma/decimal-nullable-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UuidNullableFilter } from '../prisma/uuid-nullable-filter.input';

@InputType()
export class ItemScalarWhereInput {
  @Field(() => [ItemScalarWhereInput], { nullable: true })
  @Type(() => ItemScalarWhereInput)
  AND?: Array<ItemScalarWhereInput>;

  @Field(() => [ItemScalarWhereInput], { nullable: true })
  @Type(() => ItemScalarWhereInput)
  OR?: Array<ItemScalarWhereInput>;

  @Field(() => [ItemScalarWhereInput], { nullable: true })
  @Type(() => ItemScalarWhereInput)
  NOT?: Array<ItemScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => StringFilter, { nullable: true })
  orderKey?: StringFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  title?: StringNullableFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  description?: StringNullableFilter;

  @Field(() => DecimalNullableFilter, { nullable: true })
  @Type(() => DecimalNullableFilter)
  price?: DecimalNullableFilter;

  @Field(() => BoolFilter, { nullable: true })
  archived?: BoolFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  imageId?: StringNullableFilter;

  @Field(() => UuidFilter, { nullable: true })
  menuId?: UuidFilter;

  @Field(() => UuidNullableFilter, { nullable: true })
  parentId?: UuidNullableFilter;
}
