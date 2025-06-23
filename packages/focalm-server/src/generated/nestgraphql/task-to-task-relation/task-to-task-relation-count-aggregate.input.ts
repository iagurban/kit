import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskToTaskRelationCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  srcId?: true;

  @Field(() => Boolean, { nullable: true })
  dstId?: true;

  @Field(() => Boolean, { nullable: true })
  typeId?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
