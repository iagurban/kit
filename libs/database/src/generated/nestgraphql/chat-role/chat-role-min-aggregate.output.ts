import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatRoleMinAggregate {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  chatId?: string;

  @Field(() => String, { nullable: true })
  name?: string;
}
