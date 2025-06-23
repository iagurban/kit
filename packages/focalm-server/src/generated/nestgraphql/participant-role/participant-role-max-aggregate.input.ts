import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ParticipantRoleMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  name?: true;

  @Field(() => Boolean, { nullable: true })
  color?: true;
}
