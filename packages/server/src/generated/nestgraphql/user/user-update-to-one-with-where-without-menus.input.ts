import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutMenusInput } from './user-update-without-menus.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutMenusInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutMenusInput, { nullable: false })
  @Type(() => UserUpdateWithoutMenusInput)
  data!: UserUpdateWithoutMenusInput;
}
