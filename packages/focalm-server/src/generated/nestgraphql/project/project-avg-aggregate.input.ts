import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProjectAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  tasksCounter?: true;
}
