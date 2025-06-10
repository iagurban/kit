import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserInTaskMinAggregate {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  taskId?: string;
}
