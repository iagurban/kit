import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadSessionCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  storageUploadId!: number;

  @Field(() => Int, { nullable: false })
  fileId!: number;

  @Field(() => Int, { nullable: false })
  totalChunks!: number;

  @Field(() => Int, { nullable: false })
  status!: number;

  @Field(() => Int, { nullable: false })
  failReason!: number;

  @Field(() => Int, { nullable: false })
  totalFailureCount!: number;

  @Field(() => Int, { nullable: false })
  createdAt!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
