import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TagCreateWithoutMenuInput } from './tag-create-without-menu.input';
import { TagWhereUniqueInput } from './tag-where-unique.input';

@InputType()
export class TagCreateOrConnectWithoutMenuInput {
  @Field(() => TagWhereUniqueInput, { nullable: false })
  @Type(() => TagWhereUniqueInput)
  where!: Prisma.AtLeast<TagWhereUniqueInput, 'id'>;

  @Field(() => TagCreateWithoutMenuInput, { nullable: false })
  @Type(() => TagCreateWithoutMenuInput)
  create!: TagCreateWithoutMenuInput;
}
