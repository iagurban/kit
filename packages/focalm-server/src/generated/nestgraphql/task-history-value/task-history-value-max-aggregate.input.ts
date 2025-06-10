import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskHistoryValueMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  groupId?: true;

  @Field(() => Boolean, { nullable: true })
  taskId?: true;

  @Field(() => Boolean, { nullable: true })
  key?: true;

  @Field(() => Boolean, { nullable: true })
  op?: true;
}
