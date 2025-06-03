import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ItemMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  createdAt?: true;

  @Field(() => Boolean, { nullable: true })
  orderKey?: true;

  @Field(() => Boolean, { nullable: true })
  title?: true;

  @Field(() => Boolean, { nullable: true })
  description?: true;

  @Field(() => Boolean, { nullable: true })
  price?: true;

  @Field(() => Boolean, { nullable: true })
  archived?: true;

  @Field(() => Boolean, { nullable: true })
  imageId?: true;

  @Field(() => Boolean, { nullable: true })
  menuId?: true;

  @Field(() => Boolean, { nullable: true })
  parentId?: true;
}
