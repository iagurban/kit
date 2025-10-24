import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UploadChunkCreateManySessionInputEnvelope } from './upload-chunk-create-many-session-input-envelope.input';
import { UploadChunkCreateOrConnectWithoutSessionInput } from './upload-chunk-create-or-connect-without-session.input';
import { UploadChunkCreateWithoutSessionInput } from './upload-chunk-create-without-session.input';
import { UploadChunkScalarWhereInput } from './upload-chunk-scalar-where.input';
import { UploadChunkUpdateManyWithWhereWithoutSessionInput } from './upload-chunk-update-many-with-where-without-session.input';
import { UploadChunkUpdateWithWhereUniqueWithoutSessionInput } from './upload-chunk-update-with-where-unique-without-session.input';
import { UploadChunkUpsertWithWhereUniqueWithoutSessionInput } from './upload-chunk-upsert-with-where-unique-without-session.input';
import { UploadChunkWhereUniqueInput } from './upload-chunk-where-unique.input';

@InputType()
export class UploadChunkUpdateManyWithoutSessionNestedInput {
  @Field(() => [UploadChunkCreateWithoutSessionInput], { nullable: true })
  @Type(() => UploadChunkCreateWithoutSessionInput)
  create?: Array<UploadChunkCreateWithoutSessionInput>;

  @Field(() => [UploadChunkCreateOrConnectWithoutSessionInput], { nullable: true })
  @Type(() => UploadChunkCreateOrConnectWithoutSessionInput)
  connectOrCreate?: Array<UploadChunkCreateOrConnectWithoutSessionInput>;

  @Field(() => [UploadChunkUpsertWithWhereUniqueWithoutSessionInput], { nullable: true })
  @Type(() => UploadChunkUpsertWithWhereUniqueWithoutSessionInput)
  upsert?: Array<UploadChunkUpsertWithWhereUniqueWithoutSessionInput>;

  @Field(() => UploadChunkCreateManySessionInputEnvelope, { nullable: true })
  @Type(() => UploadChunkCreateManySessionInputEnvelope)
  createMany?: UploadChunkCreateManySessionInputEnvelope;

  @Field(() => [UploadChunkWhereUniqueInput], { nullable: true })
  @Type(() => UploadChunkWhereUniqueInput)
  set?: Array<Prisma.AtLeast<UploadChunkWhereUniqueInput, 'id' | 'sessionId_partNumber'>>;

  @Field(() => [UploadChunkWhereUniqueInput], { nullable: true })
  @Type(() => UploadChunkWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<UploadChunkWhereUniqueInput, 'id' | 'sessionId_partNumber'>>;

  @Field(() => [UploadChunkWhereUniqueInput], { nullable: true })
  @Type(() => UploadChunkWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<UploadChunkWhereUniqueInput, 'id' | 'sessionId_partNumber'>>;

  @Field(() => [UploadChunkWhereUniqueInput], { nullable: true })
  @Type(() => UploadChunkWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UploadChunkWhereUniqueInput, 'id' | 'sessionId_partNumber'>>;

  @Field(() => [UploadChunkUpdateWithWhereUniqueWithoutSessionInput], { nullable: true })
  @Type(() => UploadChunkUpdateWithWhereUniqueWithoutSessionInput)
  update?: Array<UploadChunkUpdateWithWhereUniqueWithoutSessionInput>;

  @Field(() => [UploadChunkUpdateManyWithWhereWithoutSessionInput], { nullable: true })
  @Type(() => UploadChunkUpdateManyWithWhereWithoutSessionInput)
  updateMany?: Array<UploadChunkUpdateManyWithWhereWithoutSessionInput>;

  @Field(() => [UploadChunkScalarWhereInput], { nullable: true })
  @Type(() => UploadChunkScalarWhereInput)
  deleteMany?: Array<UploadChunkScalarWhereInput>;
}
