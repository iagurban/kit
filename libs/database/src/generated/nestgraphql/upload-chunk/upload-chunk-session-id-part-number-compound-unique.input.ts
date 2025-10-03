import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UploadChunkSessionIdPartNumberCompoundUniqueInput {
  @Field(() => String, { nullable: false })
  sessionId!: string;

  @Field(() => Int, { nullable: false })
  partNumber!: number;
}
