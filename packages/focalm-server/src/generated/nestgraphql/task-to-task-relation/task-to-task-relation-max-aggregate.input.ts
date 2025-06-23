import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskToTaskRelationMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  srcId?: true;

  @Field(() => Boolean, { nullable: true })
  dstId?: true;

  @Field(() => Boolean, { nullable: true })
  typeId?: true;
}
