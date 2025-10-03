import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadChunkCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  sessionId!: number;

  @Field(() => Int, { nullable: false })
  partNumber!: number;

  @Field(() => Int, { nullable: false })
  eTag!: number;

  @Field(() => Int, { nullable: false })
  leasedAt!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
