import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserUpdateWithoutInProjectsInput } from './user-update-without-in-projects.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutInProjectsInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutInProjectsInput, { nullable: false })
  @Type(() => UserUpdateWithoutInProjectsInput)
  data!: UserUpdateWithoutInProjectsInput;
}
