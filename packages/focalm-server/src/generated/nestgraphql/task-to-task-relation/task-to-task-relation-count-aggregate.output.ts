import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskToTaskRelationCountAggregate {
  @Field(() => Int, { nullable: false })
  srcId!: number;

  @Field(() => Int, { nullable: false })
  dstId!: number;

  @Field(() => Int, { nullable: false })
  typeId!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
