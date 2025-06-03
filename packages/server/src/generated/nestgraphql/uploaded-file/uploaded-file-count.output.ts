import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadedFileCount {
  @Field(() => Int, { nullable: false })
  usingItems?: number;
}
