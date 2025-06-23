import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectAvgAggregate {
  @Field(() => Float, { nullable: true })
  tasksCounter?: number;
}
