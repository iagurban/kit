import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadSessionCount {
  @Field(() => Int, { nullable: false })
  chunks?: number;
}
