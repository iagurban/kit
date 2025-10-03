import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadChunkCreateWithoutSessionInput } from './upload-chunk-create-without-session.input';
import { UploadChunkUpdateWithoutSessionInput } from './upload-chunk-update-without-session.input';
import { UploadChunkWhereUniqueInput } from './upload-chunk-where-unique.input';

@InputType()
export class UploadChunkUpsertWithWhereUniqueWithoutSessionInput {
  @Field(() => UploadChunkWhereUniqueInput, { nullable: false })
  @Type(() => UploadChunkWhereUniqueInput)
  where!: Prisma.AtLeast<UploadChunkWhereUniqueInput, 'id' | 'sessionId_partNumber'>;

  @Field(() => UploadChunkUpdateWithoutSessionInput, { nullable: false })
  @Type(() => UploadChunkUpdateWithoutSessionInput)
  update!: UploadChunkUpdateWithoutSessionInput;

  @Field(() => UploadChunkCreateWithoutSessionInput, { nullable: false })
  @Type(() => UploadChunkCreateWithoutSessionInput)
  create!: UploadChunkCreateWithoutSessionInput;
}
