import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TagCreateWithoutMenuInput } from './tag-create-without-menu.input';
import { TagUpdateWithoutMenuInput } from './tag-update-without-menu.input';
import { TagWhereUniqueInput } from './tag-where-unique.input';

@InputType()
export class TagUpsertWithWhereUniqueWithoutMenuInput {
  @Field(() => TagWhereUniqueInput, { nullable: false })
  @Type(() => TagWhereUniqueInput)
  where!: Prisma.AtLeast<TagWhereUniqueInput, 'id'>;

  @Field(() => TagUpdateWithoutMenuInput, { nullable: false })
  @Type(() => TagUpdateWithoutMenuInput)
  update!: TagUpdateWithoutMenuInput;

  @Field(() => TagCreateWithoutMenuInput, { nullable: false })
  @Type(() => TagCreateWithoutMenuInput)
  create!: TagCreateWithoutMenuInput;
}
