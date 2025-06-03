import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StoredFileCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  hash!: number;

  @Field(() => Int, { nullable: false })
  size!: number;

  @Field(() => Int, { nullable: false })
  createdAt!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
