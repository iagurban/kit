import { Field, InputType } from '@nestjs/graphql';

import { UserInTaskWhereInput } from './user-in-task-where.input';

@InputType()
export class UserInTaskListRelationFilter {
  @Field(() => UserInTaskWhereInput, { nullable: true })
  every?: UserInTaskWhereInput;

  @Field(() => UserInTaskWhereInput, { nullable: true })
  some?: UserInTaskWhereInput;

  @Field(() => UserInTaskWhereInput, { nullable: true })
  none?: UserInTaskWhereInput;
}
