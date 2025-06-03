import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshTokenMaxAggregate {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  expiresAt?: Date | string;

  @Field(() => String, { nullable: true })
  hash?: string;
}
