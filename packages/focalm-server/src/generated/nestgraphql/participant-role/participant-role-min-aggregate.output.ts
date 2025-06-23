import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ParticipantRoleMinAggregate {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  color?: string;
}
