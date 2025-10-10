import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatCreateOrConnectWithoutRolesInput } from './chat-create-or-connect-without-roles.input';
import { ChatCreateWithoutRolesInput } from './chat-create-without-roles.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatCreateNestedOneWithoutRolesInput {
  @Field(() => ChatCreateWithoutRolesInput, { nullable: true })
  @Type(() => ChatCreateWithoutRolesInput)
  create?: ChatCreateWithoutRolesInput;

  @Field(() => ChatCreateOrConnectWithoutRolesInput, { nullable: true })
  @Type(() => ChatCreateOrConnectWithoutRolesInput)
  connectOrCreate?: ChatCreateOrConnectWithoutRolesInput;

  @Field(() => ChatWhereUniqueInput, { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;
}
