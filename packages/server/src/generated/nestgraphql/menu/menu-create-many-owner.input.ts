import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MenuCreateManyOwnerInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => String, { nullable: false })
  title!: string;
}
