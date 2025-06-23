import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskTagCreateManyRoleInput } from './user-in-task-tag-create-many-role.input';

@InputType()
export class UserInTaskTagCreateManyRoleInputEnvelope {
  @Field(() => [UserInTaskTagCreateManyRoleInput], { nullable: false })
  @Type(() => UserInTaskTagCreateManyRoleInput)
  data!: Array<UserInTaskTagCreateManyRoleInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
