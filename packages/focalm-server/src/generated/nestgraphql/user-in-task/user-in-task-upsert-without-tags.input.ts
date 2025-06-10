import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskCreateWithoutTagsInput } from './user-in-task-create-without-tags.input';
import { UserInTaskUpdateWithoutTagsInput } from './user-in-task-update-without-tags.input';
import { UserInTaskWhereInput } from './user-in-task-where.input';

@InputType()
export class UserInTaskUpsertWithoutTagsInput {
  @Field(() => UserInTaskUpdateWithoutTagsInput, { nullable: false })
  @Type(() => UserInTaskUpdateWithoutTagsInput)
  update!: UserInTaskUpdateWithoutTagsInput;

  @Field(() => UserInTaskCreateWithoutTagsInput, { nullable: false })
  @Type(() => UserInTaskCreateWithoutTagsInput)
  create!: UserInTaskCreateWithoutTagsInput;

  @Field(() => UserInTaskWhereInput, { nullable: true })
  @Type(() => UserInTaskWhereInput)
  where?: UserInTaskWhereInput;
}
