import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInTaskTagCreateWithoutUserInTaskInput {
  @Field(() => String, { nullable: false })
  tag!: string;
}
