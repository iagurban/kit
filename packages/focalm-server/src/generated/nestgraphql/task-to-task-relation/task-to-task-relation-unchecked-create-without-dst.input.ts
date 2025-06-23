import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskToTaskRelationUncheckedCreateWithoutDstInput {
  @Field(() => String, { nullable: false })
  srcId!: string;

  @Field(() => String, { nullable: false })
  typeId!: string;
}
