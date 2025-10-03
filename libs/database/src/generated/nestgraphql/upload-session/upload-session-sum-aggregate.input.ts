import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UploadSessionSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  totalChunks?: true;

  @Field(() => Boolean, { nullable: true })
  totalFailureCount?: true;
}
