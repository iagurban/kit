import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserCount {
  @Field(() => Int, { nullable: false })
  uploadedFiles?: number;

  @Field(() => Int, { nullable: false })
  refreshTokens?: number;

  @Field(() => Int, { nullable: false })
  assignedTasks?: number;

  @Field(() => Int, { nullable: false })
  authoredTasks?: number;

  @Field(() => Int, { nullable: false })
  authoredTaskChanges?: number;

  @Field(() => Int, { nullable: false })
  participatingTasks?: number;

  @Field(() => Int, { nullable: false })
  inProjects?: number;
}
