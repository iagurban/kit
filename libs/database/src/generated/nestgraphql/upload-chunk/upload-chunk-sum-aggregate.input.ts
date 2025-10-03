import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UploadChunkSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  partNumber?: true;
}
