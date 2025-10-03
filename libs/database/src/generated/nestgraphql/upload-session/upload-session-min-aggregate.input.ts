import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UploadSessionMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  storageUploadId?: true;

  @Field(() => Boolean, { nullable: true })
  fileId?: true;

  @Field(() => Boolean, { nullable: true })
  totalChunks?: true;

  @Field(() => Boolean, { nullable: true })
  status?: true;

  @Field(() => Boolean, { nullable: true })
  failReason?: true;

  @Field(() => Boolean, { nullable: true })
  totalFailureCount?: true;

  @Field(() => Boolean, { nullable: true })
  createdAt?: true;
}
