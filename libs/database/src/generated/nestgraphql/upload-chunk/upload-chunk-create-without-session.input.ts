import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UploadChunkCreateWithoutSessionInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Int, { nullable: false })
  partNumber!: number;

  @Field(() => String, { nullable: true })
  eTag?: string;

  @Field(() => Date, { nullable: true })
  leasedAt?: Date | string;
}
