import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProjectCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  tasksCounter?: true;

  @Field(() => Boolean, { nullable: true })
  name?: true;

  @Field(() => Boolean, { nullable: true })
  abbrev?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
