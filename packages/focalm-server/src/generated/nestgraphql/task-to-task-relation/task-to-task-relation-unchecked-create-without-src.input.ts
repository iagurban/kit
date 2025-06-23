import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskToTaskRelationUncheckedCreateWithoutSrcInput {
  @Field(() => String, { nullable: false })
  dstId!: string;

  @Field(() => String, { nullable: false })
  typeId!: string;
}
