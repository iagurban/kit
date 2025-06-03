import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskCount {
  @Field(() => Int, { nullable: false })
  children?: number;

  @Field(() => Int, { nullable: false })
  historyGroups?: number;
}
