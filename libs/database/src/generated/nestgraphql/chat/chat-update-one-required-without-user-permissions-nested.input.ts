import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatCreateOrConnectWithoutUserPermissionsInput } from './chat-create-or-connect-without-user-permissions.input';
import { ChatCreateWithoutUserPermissionsInput } from './chat-create-without-user-permissions.input';
import { ChatUpdateToOneWithWhereWithoutUserPermissionsInput } from './chat-update-to-one-with-where-without-user-permissions.input';
import { ChatUpsertWithoutUserPermissionsInput } from './chat-upsert-without-user-permissions.input';
import { ChatWhereUniqueInput } from './chat-where-unique.input';

@InputType()
export class ChatUpdateOneRequiredWithoutUserPermissionsNestedInput {
  @Field(() => ChatCreateWithoutUserPermissionsInput, { nullable: true })
  @Type(() => ChatCreateWithoutUserPermissionsInput)
  create?: ChatCreateWithoutUserPermissionsInput;

  @Field(() => ChatCreateOrConnectWithoutUserPermissionsInput, { nullable: true })
  @Type(() => ChatCreateOrConnectWithoutUserPermissionsInput)
  connectOrCreate?: ChatCreateOrConnectWithoutUserPermissionsInput;

  @Field(() => ChatUpsertWithoutUserPermissionsInput, { nullable: true })
  @Type(() => ChatUpsertWithoutUserPermissionsInput)
  upsert?: ChatUpsertWithoutUserPermissionsInput;

  @Field(() => ChatWhereUniqueInput, { nullable: true })
  @Type(() => ChatWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatWhereUniqueInput, 'id'>;

  @Field(() => ChatUpdateToOneWithWhereWithoutUserPermissionsInput, { nullable: true })
  @Type(() => ChatUpdateToOneWithWhereWithoutUserPermissionsInput)
  update?: ChatUpdateToOneWithWhereWithoutUserPermissionsInput;
}
