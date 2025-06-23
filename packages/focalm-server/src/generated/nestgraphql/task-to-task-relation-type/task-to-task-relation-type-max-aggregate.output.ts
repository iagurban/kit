import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskToTaskRelationTypeMaxAggregate {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  forward?: string;

  @Field(() => String, { nullable: true })
  inverse?: string;

  @Field(() => String, { nullable: true })
  projectId?: string;
}
