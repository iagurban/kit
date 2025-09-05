import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StoredFileCount {
  @Field(() => Int, { nullable: false })
  uploads?: number;
}
