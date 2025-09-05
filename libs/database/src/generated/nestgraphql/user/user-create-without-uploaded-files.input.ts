import { Field, InputType } from '@nestjs/graphql';

import { RefreshTokenCreateNestedManyWithoutUserInput } from '../refresh-token/refresh-token-create-nested-many-without-user.input';

@InputType()
export class UserCreateWithoutUploadedFilesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: true })
  abbrev?: string;

  @Field(() => String, { nullable: false })
  passwordHash!: string;

  @Field(() => RefreshTokenCreateNestedManyWithoutUserInput, { nullable: true })
  refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput;
}
