import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { UploadSession } from '../upload-session/upload-session.model';

@ObjectType()
export class UploadChunk {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  sessionId!: string;

  @Field(() => Int, { nullable: false })
  partNumber!: number;

  @Field(() => String, { nullable: true })
  eTag!: string | null;

  @Field(() => Date, { nullable: true })
  leasedAt!: Date | null;

  @Field(() => UploadSession, { nullable: false })
  session?: UploadSession;
}
