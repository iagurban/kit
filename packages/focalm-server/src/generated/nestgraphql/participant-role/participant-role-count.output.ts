import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ParticipantRoleCount {
  @Field(() => Int, { nullable: false })
  usersInTasks?: number;
}
