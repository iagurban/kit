import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadChunkMaxAggregate {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  sessionId?: string;

  @Field(() => Int, { nullable: true })
  partNumber?: number;

  @Field(() => String, { nullable: true })
  eTag?: string;

  @Field(() => Date, { nullable: true })
  leasedAt?: Date | string;
}
