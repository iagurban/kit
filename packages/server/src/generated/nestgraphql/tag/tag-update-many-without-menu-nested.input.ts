import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TagCreateManyMenuInputEnvelope } from './tag-create-many-menu-input-envelope.input';
import { TagCreateOrConnectWithoutMenuInput } from './tag-create-or-connect-without-menu.input';
import { TagCreateWithoutMenuInput } from './tag-create-without-menu.input';
import { TagScalarWhereInput } from './tag-scalar-where.input';
import { TagUpdateManyWithWhereWithoutMenuInput } from './tag-update-many-with-where-without-menu.input';
import { TagUpdateWithWhereUniqueWithoutMenuInput } from './tag-update-with-where-unique-without-menu.input';
import { TagUpsertWithWhereUniqueWithoutMenuInput } from './tag-upsert-with-where-unique-without-menu.input';
import { TagWhereUniqueInput } from './tag-where-unique.input';

@InputType()
export class TagUpdateManyWithoutMenuNestedInput {
  @Field(() => [TagCreateWithoutMenuInput], { nullable: true })
  @Type(() => TagCreateWithoutMenuInput)
  create?: Array<TagCreateWithoutMenuInput>;

  @Field(() => [TagCreateOrConnectWithoutMenuInput], { nullable: true })
  @Type(() => TagCreateOrConnectWithoutMenuInput)
  connectOrCreate?: Array<TagCreateOrConnectWithoutMenuInput>;

  @Field(() => [TagUpsertWithWhereUniqueWithoutMenuInput], { nullable: true })
  @Type(() => TagUpsertWithWhereUniqueWithoutMenuInput)
  upsert?: Array<TagUpsertWithWhereUniqueWithoutMenuInput>;

  @Field(() => TagCreateManyMenuInputEnvelope, { nullable: true })
  @Type(() => TagCreateManyMenuInputEnvelope)
  createMany?: TagCreateManyMenuInputEnvelope;

  @Field(() => [TagWhereUniqueInput], { nullable: true })
  @Type(() => TagWhereUniqueInput)
  set?: Array<Prisma.AtLeast<TagWhereUniqueInput, 'id'>>;

  @Field(() => [TagWhereUniqueInput], { nullable: true })
  @Type(() => TagWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<TagWhereUniqueInput, 'id'>>;

  @Field(() => [TagWhereUniqueInput], { nullable: true })
  @Type(() => TagWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<TagWhereUniqueInput, 'id'>>;

  @Field(() => [TagWhereUniqueInput], { nullable: true })
  @Type(() => TagWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TagWhereUniqueInput, 'id'>>;

  @Field(() => [TagUpdateWithWhereUniqueWithoutMenuInput], { nullable: true })
  @Type(() => TagUpdateWithWhereUniqueWithoutMenuInput)
  update?: Array<TagUpdateWithWhereUniqueWithoutMenuInput>;

  @Field(() => [TagUpdateManyWithWhereWithoutMenuInput], { nullable: true })
  @Type(() => TagUpdateManyWithWhereWithoutMenuInput)
  updateMany?: Array<TagUpdateManyWithWhereWithoutMenuInput>;

  @Field(() => [TagScalarWhereInput], { nullable: true })
  @Type(() => TagScalarWhereInput)
  deleteMany?: Array<TagScalarWhereInput>;
}
