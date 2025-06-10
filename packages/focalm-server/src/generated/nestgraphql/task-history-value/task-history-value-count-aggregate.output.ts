import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskHistoryValueCountAggregate {
  @Field(() => Int, { nullable: false })
  groupId!: number;

  @Field(() => Int, { nullable: false })
  taskId!: number;

  @Field(() => Int, { nullable: false })
  key!: number;

  @Field(() => Int, { nullable: false })
  op!: number;

  @Field(() => Int, { nullable: false })
  value!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
