import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StoredFileSumAggregate {
  @Field(() => Int, { nullable: true })
  size?: number;
}
