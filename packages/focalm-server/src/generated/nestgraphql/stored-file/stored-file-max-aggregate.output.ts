import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StoredFileMaxAggregate {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  hash?: string;

  @Field(() => Int, { nullable: true })
  size?: number;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;
}
