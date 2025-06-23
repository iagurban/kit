import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskCount {
  @Field(() => Int, { nullable: false })
  children?: number;

  @Field(() => Int, { nullable: false })
  participants?: number;

  @Field(() => Int, { nullable: false })
  historyValues?: number;

  @Field(() => Int, { nullable: false })
  relationsSrc?: number;

  @Field(() => Int, { nullable: false })
  relationsDst?: number;
}
