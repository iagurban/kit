import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskToTaskRelationTypeCreateManyInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  forward!: string;

  @Field(() => String, { nullable: false })
  inverse!: string;

  @Field(() => String, { nullable: false })
  projectId!: string;
}
