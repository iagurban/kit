import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInTaskCreateManyInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  taskId!: string;
}
