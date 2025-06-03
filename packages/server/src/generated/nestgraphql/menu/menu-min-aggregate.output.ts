import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MenuMinAggregate {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  ownerId?: string;
}
