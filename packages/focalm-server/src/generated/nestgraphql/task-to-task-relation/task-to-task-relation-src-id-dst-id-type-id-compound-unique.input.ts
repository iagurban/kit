import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskToTaskRelationSrcIdDstIdTypeIdCompoundUniqueInput {
  @Field(() => String, { nullable: false })
  srcId!: string;

  @Field(() => String, { nullable: false })
  dstId!: string;

  @Field(() => String, { nullable: false })
  typeId!: string;
}
