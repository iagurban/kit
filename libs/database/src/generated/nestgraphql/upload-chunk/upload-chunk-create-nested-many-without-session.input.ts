import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UploadChunkCreateManySessionInputEnvelope } from './upload-chunk-create-many-session-input-envelope.input';
import { UploadChunkCreateOrConnectWithoutSessionInput } from './upload-chunk-create-or-connect-without-session.input';
import { UploadChunkCreateWithoutSessionInput } from './upload-chunk-create-without-session.input';
import { UploadChunkWhereUniqueInput } from './upload-chunk-where-unique.input';

@InputType()
export class UploadChunkCreateNestedManyWithoutSessionInput {
  @Field(() => [UploadChunkCreateWithoutSessionInput], { nullable: true })
  @Type(() => UploadChunkCreateWithoutSessionInput)
  create?: Array<UploadChunkCreateWithoutSessionInput>;

  @Field(() => [UploadChunkCreateOrConnectWithoutSessionInput], { nullable: true })
  @Type(() => UploadChunkCreateOrConnectWithoutSessionInput)
  connectOrCreate?: Array<UploadChunkCreateOrConnectWithoutSessionInput>;

  @Field(() => UploadChunkCreateManySessionInputEnvelope, { nullable: true })
  @Type(() => UploadChunkCreateManySessionInputEnvelope)
  createMany?: UploadChunkCreateManySessionInputEnvelope;

  @Field(() => [UploadChunkWhereUniqueInput], { nullable: true })
  @Type(() => UploadChunkWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UploadChunkWhereUniqueInput, 'id' | 'sessionId_partNumber'>>;
}
