import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StoredFileCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  checksum!: number;

  @Field(() => Int, { nullable: false })
  sizeBytes!: number;

  @Field(() => Int, { nullable: false })
  originalFilename!: number;

  @Field(() => Int, { nullable: false })
  mimeType!: number;

  @Field(() => Int, { nullable: false })
  storageKey!: number;

  @Field(() => Int, { nullable: false })
  cdnUrl!: number;

  @Field(() => Int, { nullable: false })
  metadata!: number;

  @Field(() => Int, { nullable: false })
  uploadedByUserId!: number;

  @Field(() => Int, { nullable: false })
  createdAt!: number;

  @Field(() => Int, { nullable: false })
  updatedAt!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
