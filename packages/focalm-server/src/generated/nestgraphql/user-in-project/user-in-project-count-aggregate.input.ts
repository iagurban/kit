import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInProjectCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  userId?: true;

  @Field(() => Boolean, { nullable: true })
  projectId?: true;

  @Field(() => Boolean, { nullable: true })
  permission?: true;

  @Field(() => Boolean, { nullable: true })
  kind?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
