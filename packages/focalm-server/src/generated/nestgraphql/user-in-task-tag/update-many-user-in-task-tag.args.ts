import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserInTaskTagUncheckedUpdateManyInput } from './user-in-task-tag-unchecked-update-many.input';
import { UserInTaskTagWhereInput } from './user-in-task-tag-where.input';

@ArgsType()
export class UpdateManyUserInTaskTagArgs {
  @Field(() => UserInTaskTagUncheckedUpdateManyInput, { nullable: false })
  @Type(() => UserInTaskTagUncheckedUpdateManyInput)
  data!: UserInTaskTagUncheckedUpdateManyInput;

  @Field(() => UserInTaskTagWhereInput, { nullable: true })
  @Type(() => UserInTaskTagWhereInput)
  where?: UserInTaskTagWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
