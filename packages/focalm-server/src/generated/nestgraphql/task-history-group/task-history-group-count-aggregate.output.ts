import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskHistoryGroupCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  authorId!: number;

  @Field(() => Int, { nullable: false })
  localCreatedAt!: number;

  @Field(() => Int, { nullable: false })
  createdAt!: number;

  @Field(() => Int, { nullable: false })
  createdAtFixReason!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
