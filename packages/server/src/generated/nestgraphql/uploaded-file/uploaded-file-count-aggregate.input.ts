import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UploadedFileCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  originalName?: true;

  @Field(() => Boolean, { nullable: true })
  mimetype?: true;

  @Field(() => Boolean, { nullable: true })
  uploadedAt?: true;

  @Field(() => Boolean, { nullable: true })
  uploaderId?: true;

  @Field(() => Boolean, { nullable: true })
  storedFileId?: true;

  @Field(() => Boolean, { nullable: true })
  menuId?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
