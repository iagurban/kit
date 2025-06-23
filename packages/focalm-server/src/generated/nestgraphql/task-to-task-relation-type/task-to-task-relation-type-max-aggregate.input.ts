import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskToTaskRelationTypeMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  forward?: true;

  @Field(() => Boolean, { nullable: true })
  inverse?: true;

  @Field(() => Boolean, { nullable: true })
  projectId?: true;
}
