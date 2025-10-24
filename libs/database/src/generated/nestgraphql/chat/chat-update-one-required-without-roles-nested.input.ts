import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatCreateOrConnectWithoutRolesInput } from './chat-create-or-connect-without-roles.input';
import { ChatCreateWithoutRolesInput } from './chat-create-without-roles.input';
import { ChatUpdateToOneWithWhereWithoutRolesInput } from './chat-update-to-one-with-where-without-roles.input';
import { ChatUpsertWithoutRolesInput } from './chat-upsert-without-roles.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatUpdateOneRequiredWithoutRolesNestedInput {
  @Field(() => ChatCreateWithoutRolesInput, { nullable: true })
  @Type(() => ChatCreateWithoutRolesInput)
  create?: ChatCreateWithoutRolesInput;

  @Field(() => ChatCreateOrConnectWithoutRolesInput, { nullable: true })
  @Type(() => ChatCreateOrConnectWithoutRolesInput)
  connectOrCreate?: ChatCreateOrConnectWithoutRolesInput;

  @Field(() => ChatUpsertWithoutRolesInput, { nullable: true })
  @Type(() => ChatUpsertWithoutRolesInput)
  upsert?: ChatUpsertWithoutRolesInput;

  @Field(() => ChatWhereUniqueInput, { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatUpdateToOneWithWhereWithoutRolesInput, { nullable: true })
  @Type(() => ChatUpdateToOneWithWhereWithoutRolesInput)
  update?: ChatUpdateToOneWithWhereWithoutRolesInput;
}
