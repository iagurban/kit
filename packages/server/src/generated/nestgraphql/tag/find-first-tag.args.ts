import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TagOrderByWithRelationInput } from './tag-order-by-with-relation.input';
import { TagScalarFieldEnum } from './tag-scalar-field.enum';
import { TagWhereInput } from './tag-where.input';
import { TagWhereUniqueInput } from './tag-where-unique.input';

@ArgsType()
export class FindFirstTagArgs {
  @Field(() => TagWhereInput, { nullable: true })
  @Type(() => TagWhereInput)
  where?: TagWhereInput;

  @Field(() => [TagOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TagOrderByWithRelationInput>;

  @Field(() => TagWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<TagWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [TagScalarFieldEnum], { nullable: true })
  distinct?: Array<`${TagScalarFieldEnum}`>;
}
