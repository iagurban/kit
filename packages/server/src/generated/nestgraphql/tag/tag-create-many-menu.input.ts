import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TagCreateManyMenuInput {
  @Field(() => String, { nullable: true })
  id?: string;
}
