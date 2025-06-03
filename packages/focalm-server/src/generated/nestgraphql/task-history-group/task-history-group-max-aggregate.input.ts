import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TaskHistoryGroupMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  taskId?: true;

  @Field(() => Boolean, { nullable: true })
  authorId?: true;

  @Field(() => Boolean, { nullable: true })
  localCreatedAt?: true;

  @Field(() => Boolean, { nullable: true })
  createdAt?: true;

  @Field(() => Boolean, { nullable: true })
  createdAtFixReason?: true;
}
