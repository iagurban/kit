import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskToTaskRelationTypeCount {
  @Field(() => Int, { nullable: false })
  relations?: number;
}
