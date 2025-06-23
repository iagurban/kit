import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskToTaskRelationCreateManyDstInput {
  @Field(() => String, { nullable: false })
  srcId!: string;

  @Field(() => String, { nullable: false })
  typeId!: string;
}
