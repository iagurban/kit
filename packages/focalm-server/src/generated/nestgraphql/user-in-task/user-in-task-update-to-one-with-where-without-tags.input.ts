import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskUpdateWithoutTagsInput } from './user-in-task-update-without-tags.input';
import { UserInTaskWhereInput } from './user-in-task-where.input';

@InputType()
export class UserInTaskUpdateToOneWithWhereWithoutTagsInput {
  @Field(() => UserInTaskWhereInput, { nullable: true })
  @Type(() => UserInTaskWhereInput)
  where?: UserInTaskWhereInput;

  @Field(() => UserInTaskUpdateWithoutTagsInput, { nullable: false })
  @Type(() => UserInTaskUpdateWithoutTagsInput)
  data!: UserInTaskUpdateWithoutTagsInput;
}
