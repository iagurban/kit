import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInTaskTagCreateManyUserInTaskInput {
  @Field(() => String, { nullable: false })
  tag!: string;
}
