import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskToTaskRelationTypeCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  forward!: number;

  @Field(() => Int, { nullable: false })
  inverse!: number;

  @Field(() => Int, { nullable: false })
  projectId!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
