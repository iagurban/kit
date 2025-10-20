import { Field, InputType } from '@nestjs/graphql';

import { UserCreateNestedOneWithoutRefreshTokenInput } from '../user/user-create-nested-one-without-refresh-token.input';

@InputType()
export class RefreshTokenCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: false })
  expiresAt!: Date | string;

  @Field(() => String, { nullable: false })
  hash!: string;

  @Field(() => UserCreateNestedOneWithoutRefreshTokenInput, { nullable: false })
  user!: UserCreateNestedOneWithoutRefreshTokenInput;
}
