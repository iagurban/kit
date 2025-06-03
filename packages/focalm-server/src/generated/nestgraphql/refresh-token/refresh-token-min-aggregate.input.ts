import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RefreshTokenMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  userId?: true;

  @Field(() => Boolean, { nullable: true })
  createdAt?: true;

  @Field(() => Boolean, { nullable: true })
  expiresAt?: true;

  @Field(() => Boolean, { nullable: true })
  hash?: true;
}
