import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StoredFileAvgAggregate {
  @Field(() => Float, { nullable: true })
  size?: number;
}
