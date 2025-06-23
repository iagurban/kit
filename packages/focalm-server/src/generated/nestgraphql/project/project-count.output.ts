import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectCount {
  @Field(() => Int, { nullable: false })
  relationTypes?: number;

  @Field(() => Int, { nullable: false })
  tasks?: number;

  @Field(() => Int, { nullable: false })
  usersPermissions?: number;
}
