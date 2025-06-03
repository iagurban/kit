import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FetchAllTasksOptionsInput {
  @Field(() => Date, { nullable: true })
  updatedAfter?: Date;
}
