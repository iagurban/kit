import { Field, InputType } from '@nestjs/graphql';

import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class TagScalarWhereInput {
  @Field(() => [TagScalarWhereInput], { nullable: true })
  AND?: Array<TagScalarWhereInput>;

  @Field(() => [TagScalarWhereInput], { nullable: true })
  OR?: Array<TagScalarWhereInput>;

  @Field(() => [TagScalarWhereInput], { nullable: true })
  NOT?: Array<TagScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  menuId?: UuidFilter;
}
