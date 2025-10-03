import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StoredFileCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  checksum?: true;

  @Field(() => Boolean, { nullable: true })
  sizeBytes?: true;

  @Field(() => Boolean, { nullable: true })
  originalFilename?: true;

  @Field(() => Boolean, { nullable: true })
  mimeType?: true;

  @Field(() => Boolean, { nullable: true })
  storageKey?: true;

  @Field(() => Boolean, { nullable: true })
  cdnUrl?: true;

  @Field(() => Boolean, { nullable: true })
  metadata?: true;

  @Field(() => Boolean, { nullable: true })
  uploadedByUserId?: true;

  @Field(() => Boolean, { nullable: true })
  createdAt?: true;

  @Field(() => Boolean, { nullable: true })
  updatedAt?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
