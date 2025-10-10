import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatCreateManyDefaultRoleInputEnvelope } from './chat-create-many-default-role-input-envelope.input';
import { ChatCreateOrConnectWithoutDefaultRoleInput } from './chat-create-or-connect-without-default-role.input';
import { ChatCreateWithoutDefaultRoleInput } from './chat-create-without-default-role.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatUncheckedCreateNestedManyWithoutDefaultRoleInput {
  @Field(() => [ChatCreateWithoutDefaultRoleInput], { nullable: true })
  @Type(() => ChatCreateWithoutDefaultRoleInput)
  create?: Array<ChatCreateWithoutDefaultRoleInput>;

  @Field(() => [ChatCreateOrConnectWithoutDefaultRoleInput], { nullable: true })
  @Type(() => ChatCreateOrConnectWithoutDefaultRoleInput)
  connectOrCreate?: Array<ChatCreateOrConnectWithoutDefaultRoleInput>;

  @Field(() => ChatCreateManyDefaultRoleInputEnvelope, { nullable: true })
  @Type(() => ChatCreateManyDefaultRoleInputEnvelope)
  createMany?: ChatCreateManyDefaultRoleInputEnvelope;

  @Field(() => [ChatWhereUniqueInput], { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ChatWhereUniqueInput, 'id'>>;
}
