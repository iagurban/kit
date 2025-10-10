import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatCreateManyInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: false })
  ownerId!: string;

  @Field(() => String, { nullable: true })
  defaultRoleId?: string;
}
