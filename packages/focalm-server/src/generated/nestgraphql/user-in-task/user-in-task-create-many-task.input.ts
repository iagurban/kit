import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInTaskCreateManyTaskInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  userId!: string;
}
