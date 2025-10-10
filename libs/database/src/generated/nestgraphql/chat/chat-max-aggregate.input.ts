import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  title?: true;

  @Field(() => Boolean, { nullable: true })
  bio?: true;

  @Field(() => Boolean, { nullable: true })
  avatar?: true;

  @Field(() => Boolean, { nullable: true })
  ownerId?: true;

  @Field(() => Boolean, { nullable: true })
  defaultRoleId?: true;
}
