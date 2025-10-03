import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadChunkUpdateWithoutSessionInput } from './upload-chunk-update-without-session.input';
import { UploadChunkWhereUniqueInput } from './upload-chunk-where-unique.input';

@InputType()
export class UploadChunkUpdateWithWhereUniqueWithoutSessionInput {
  @Field(() => UploadChunkWhereUniqueInput, { nullable: false })
  @Type(() => UploadChunkWhereUniqueInput)
  where!: Prisma.AtLeast<UploadChunkWhereUniqueInput, 'id' | 'sessionId_partNumber'>;

  @Field(() => UploadChunkUpdateWithoutSessionInput, { nullable: false })
  @Type(() => UploadChunkUpdateWithoutSessionInput)
  data!: UploadChunkUpdateWithoutSessionInput;
}
