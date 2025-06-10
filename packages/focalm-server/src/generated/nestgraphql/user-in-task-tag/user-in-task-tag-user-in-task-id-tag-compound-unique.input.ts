import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInTaskTagUserInTaskIdTagCompoundUniqueInput {
  @Field(() => String, { nullable: false })
  userInTaskId!: string;

  @Field(() => String, { nullable: false })
  tag!: string;
}
