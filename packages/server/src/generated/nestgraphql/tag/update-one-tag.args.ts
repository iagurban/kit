import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TagUpdateInput } from './tag-update.input';
import { TagWhereUniqueInput } from './tag-where-unique.input';

@ArgsType()
export class UpdateOneTagArgs {
  @Field(() => TagUpdateInput, { nullable: false })
  @Type(() => TagUpdateInput)
  data!: TagUpdateInput;

  @Field(() => TagWhereUniqueInput, { nullable: false })
  @Type(() => TagWhereUniqueInput)
  where!: Prisma.AtLeast<TagWhereUniqueInput, 'id'>;
}
