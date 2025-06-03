import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StoredFileAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  size?: true;
}
