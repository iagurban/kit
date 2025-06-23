import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInProjectMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  userId?: true;

  @Field(() => Boolean, { nullable: true })
  projectId?: true;

  @Field(() => Boolean, { nullable: true })
  permission?: true;

  @Field(() => Boolean, { nullable: true })
  kind?: true;
}
