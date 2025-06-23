import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskToTaskRelationMaxAggregate {
  @Field(() => String, { nullable: true })
  srcId?: string;

  @Field(() => String, { nullable: true })
  dstId?: string;

  @Field(() => String, { nullable: true })
  typeId?: string;
}
