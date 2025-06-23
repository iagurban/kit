import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectSumAggregate {
  @Field(() => String, { nullable: true })
  tasksCounter?: bigint | number;
}
