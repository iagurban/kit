import { ArgsType, Field, ID } from '@nestjs/graphql';
import { JsonValue } from '@poslah/util/json-type';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@ArgsType()
export class PushChatEventArgs {
  @Field(() => ID)
  @IsUUID()
  chatId!: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  type!: string;

  @Field(() => GraphQLJSON)
  payload!: JsonValue;
}
