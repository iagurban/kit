import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskHistoryGroupCount {
  @Field(() => Int, { nullable: false })
  values?: number;
}
