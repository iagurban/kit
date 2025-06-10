import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInTaskCreateManyUserInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  taskId!: string;
}
