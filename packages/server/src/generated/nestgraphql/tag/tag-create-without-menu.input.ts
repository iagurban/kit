import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TagCreateWithoutMenuInput {
  @Field(() => String, { nullable: true })
  id?: string;
}
