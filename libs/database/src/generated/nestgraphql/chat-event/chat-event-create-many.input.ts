import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class ChatEventCreateManyInput {
  @Field(() => String, { nullable: true })
  id?: bigint | number;

  @Field(() => String, { nullable: false })
  nn!: bigint | number;

  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => String, { nullable: false })
  type!: string;

  @Field(() => GraphQLJSON, { nullable: false })
  payload!: any;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;
}
