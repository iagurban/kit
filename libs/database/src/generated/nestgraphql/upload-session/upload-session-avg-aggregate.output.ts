import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadSessionAvgAggregate {
  @Field(() => Float, { nullable: true })
  totalChunks?: number;

  @Field(() => Float, { nullable: true })
  totalFailureCount?: number;
}
