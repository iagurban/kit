import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectMinAggregate {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  tasksCounter?: bigint | number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  abbrev?: string;
}
