import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StoredFileSumAggregate {
  @Field(() => String, { nullable: true })
  sizeBytes?: bigint | number;
}
