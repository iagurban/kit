import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadChunkAvgAggregate {
  @Field(() => Float, { nullable: true })
  partNumber?: number;
}
