import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UploadChunkMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  sessionId?: true;

  @Field(() => Boolean, { nullable: true })
  partNumber?: true;

  @Field(() => Boolean, { nullable: true })
  eTag?: true;

  @Field(() => Boolean, { nullable: true })
  leasedAt?: true;
}
