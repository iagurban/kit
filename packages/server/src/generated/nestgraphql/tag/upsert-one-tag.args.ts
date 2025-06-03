import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TagCreateInput } from './tag-create.input';
import { TagUpdateInput } from './tag-update.input';
import { TagWhereUniqueInput } from './tag-where-unique.input';

@ArgsType()
export class UpsertOneTagArgs {
  @Field(() => TagWhereUniqueInput, { nullable: false })
  @Type(() => TagWhereUniqueInput)
  where!: Prisma.AtLeast<TagWhereUniqueInput, 'id'>;

  @Field(() => TagCreateInput, { nullable: false })
  @Type(() => TagCreateInput)
  create!: TagCreateInput;

  @Field(() => TagUpdateInput, { nullable: false })
  @Type(() => TagUpdateInput)
  update!: TagUpdateInput;
}
