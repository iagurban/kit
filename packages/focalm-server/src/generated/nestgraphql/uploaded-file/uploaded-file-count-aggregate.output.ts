import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadedFileCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  originalName!: number;

  @Field(() => Int, { nullable: false })
  mimetype!: number;

  @Field(() => Int, { nullable: false })
  uploadedAt!: number;

  @Field(() => Int, { nullable: false })
  uploaderId!: number;

  @Field(() => Int, { nullable: false })
  storedFileId!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
