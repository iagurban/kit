import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutOwnProjectInput } from './user-update-without-own-project.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutOwnProjectInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutOwnProjectInput, { nullable: false })
  @Type(() => UserUpdateWithoutOwnProjectInput)
  data!: UserUpdateWithoutOwnProjectInput;
}
