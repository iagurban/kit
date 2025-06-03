import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TagCreateManyMenuInputEnvelope } from './tag-create-many-menu-input-envelope.input';
import { TagCreateOrConnectWithoutMenuInput } from './tag-create-or-connect-without-menu.input';
import { TagCreateWithoutMenuInput } from './tag-create-without-menu.input';
import { TagWhereUniqueInput } from './tag-where-unique.input';

@InputType()
export class TagCreateNestedManyWithoutMenuInput {
  @Field(() => [TagCreateWithoutMenuInput], { nullable: true })
  @Type(() => TagCreateWithoutMenuInput)
  create?: Array<TagCreateWithoutMenuInput>;

  @Field(() => [TagCreateOrConnectWithoutMenuInput], { nullable: true })
  @Type(() => TagCreateOrConnectWithoutMenuInput)
  connectOrCreate?: Array<TagCreateOrConnectWithoutMenuInput>;

  @Field(() => TagCreateManyMenuInputEnvelope, { nullable: true })
  @Type(() => TagCreateManyMenuInputEnvelope)
  createMany?: TagCreateManyMenuInputEnvelope;

  @Field(() => [TagWhereUniqueInput], { nullable: true })
  @Type(() => TagWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TagWhereUniqueInput, 'id'>>;
}
