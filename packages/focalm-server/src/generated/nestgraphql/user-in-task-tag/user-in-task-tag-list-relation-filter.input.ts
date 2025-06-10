import { Field, InputType } from '@nestjs/graphql';

import { UserInTaskTagWhereInput } from './user-in-task-tag-where.input';

@InputType()
export class UserInTaskTagListRelationFilter {
  @Field(() => UserInTaskTagWhereInput, { nullable: true })
  every?: UserInTaskTagWhereInput;

  @Field(() => UserInTaskTagWhereInput, { nullable: true })
  some?: UserInTaskTagWhereInput;

  @Field(() => UserInTaskTagWhereInput, { nullable: true })
  none?: UserInTaskTagWhereInput;
}
