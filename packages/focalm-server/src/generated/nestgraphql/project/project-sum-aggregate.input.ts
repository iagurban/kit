import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProjectSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  tasksCounter?: true;
}
