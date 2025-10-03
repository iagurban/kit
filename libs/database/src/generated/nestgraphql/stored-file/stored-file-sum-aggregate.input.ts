import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StoredFileSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  sizeBytes?: true;
}
