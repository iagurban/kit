import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  tasksCounter!: number;

  @Field(() => Int, { nullable: false })
  name!: number;

  @Field(() => Int, { nullable: false })
  abbrev!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
