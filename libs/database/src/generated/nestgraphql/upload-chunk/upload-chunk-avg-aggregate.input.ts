import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UploadChunkAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  partNumber?: true;
}
