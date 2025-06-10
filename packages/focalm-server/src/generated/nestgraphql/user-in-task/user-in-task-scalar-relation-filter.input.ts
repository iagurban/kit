import { Field, InputType } from '@nestjs/graphql';

import { UserInTaskWhereInput } from './user-in-task-where.input';

@InputType()
export class UserInTaskScalarRelationFilter {
  @Field(() => UserInTaskWhereInput, { nullable: true })
  is?: UserInTaskWhereInput;

  @Field(() => UserInTaskWhereInput, { nullable: true })
  isNot?: UserInTaskWhereInput;
}
