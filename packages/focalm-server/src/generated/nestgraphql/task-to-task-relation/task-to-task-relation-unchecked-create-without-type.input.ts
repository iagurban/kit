import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskToTaskRelationUncheckedCreateWithoutTypeInput {
  @Field(() => String, { nullable: false })
  srcId!: string;

  @Field(() => String, { nullable: false })
  dstId!: string;
}
