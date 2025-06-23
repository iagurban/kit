import { Field, InputType } from '@nestjs/graphql';

import { UserInProjectWhereInput } from './user-in-project-where.input';

@InputType()
export class UserInProjectListRelationFilter {
  @Field(() => UserInProjectWhereInput, { nullable: true })
  every?: UserInProjectWhereInput;

  @Field(() => UserInProjectWhereInput, { nullable: true })
  some?: UserInProjectWhereInput;

  @Field(() => UserInProjectWhereInput, { nullable: true })
  none?: UserInProjectWhereInput;
}
