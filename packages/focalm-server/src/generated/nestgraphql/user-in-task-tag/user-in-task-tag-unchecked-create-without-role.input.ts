import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInTaskTagUncheckedCreateWithoutRoleInput {
  @Field(() => String, { nullable: false })
  userInTaskId!: string;
}
