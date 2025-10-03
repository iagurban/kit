import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadChunkSumAggregate {
  @Field(() => Int, { nullable: true })
  partNumber?: number;
}
