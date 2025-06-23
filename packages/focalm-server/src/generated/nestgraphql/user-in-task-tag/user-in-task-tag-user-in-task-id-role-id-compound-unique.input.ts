import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInTaskTagUserInTaskIdRoleIdCompoundUniqueInput {
  @Field(() => String, { nullable: false })
  userInTaskId!: string;

  @Field(() => String, { nullable: false })
  roleId!: string;
}
