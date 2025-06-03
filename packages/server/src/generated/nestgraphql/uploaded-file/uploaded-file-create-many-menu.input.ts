import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UploadedFileCreateManyMenuInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  originalName!: string;

  @Field(() => String, { nullable: false })
  mimetype!: string;

  @Field(() => Date, { nullable: true })
  uploadedAt?: Date | string;

  @Field(() => String, { nullable: false })
  uploaderId!: string;

  @Field(() => String, { nullable: false })
  storedFileId!: string;
}
