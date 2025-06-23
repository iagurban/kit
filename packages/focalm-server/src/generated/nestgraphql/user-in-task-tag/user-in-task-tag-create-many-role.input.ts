import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInTaskTagCreateManyRoleInput {
  @Field(() => String, { nullable: false })
  userInTaskId!: string;
}
