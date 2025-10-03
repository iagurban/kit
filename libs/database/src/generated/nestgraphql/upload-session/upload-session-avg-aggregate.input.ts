import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UploadSessionAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  totalChunks?: true;

  @Field(() => Boolean, { nullable: true })
  totalFailureCount?: true;
}
