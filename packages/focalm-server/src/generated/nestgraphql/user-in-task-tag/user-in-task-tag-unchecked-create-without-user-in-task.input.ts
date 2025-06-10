import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInTaskTagUncheckedCreateWithoutUserInTaskInput {
  @Field(() => String, { nullable: false })
  tag!: string;
}
