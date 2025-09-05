import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RefreshTokenUncheckedCreateWithoutUserInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: false })
  expiresAt!: Date | string;

  @Field(() => String, { nullable: false })
  hash!: string;
}
