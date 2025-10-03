import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StoredFileMaxAggregate {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  checksum?: string;

  @Field(() => String, { nullable: true })
  sizeBytes?: bigint | number;

  @Field(() => String, { nullable: true })
  originalFilename?: string;

  @Field(() => String, { nullable: true })
  mimeType?: string;

  @Field(() => String, { nullable: true })
  storageKey?: string;

  @Field(() => String, { nullable: true })
  cdnUrl?: string;

  @Field(() => String, { nullable: true })
  uploadedByUserId?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;
}
