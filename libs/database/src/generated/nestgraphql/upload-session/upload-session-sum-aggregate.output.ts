import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadSessionSumAggregate {
  @Field(() => Int, { nullable: true })
  totalChunks?: number;

  @Field(() => Int, { nullable: true })
  totalFailureCount?: number;
}
