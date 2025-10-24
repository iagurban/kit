import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UploadSessionCreateWithoutChunksInput } from './upload-session-create-without-chunks.input';
import { UploadSessionWhereUniqueInput } from './upload-session-where-unique.input';

@InputType()
export class UploadSessionCreateOrConnectWithoutChunksInput {
  @Field(() => UploadSessionWhereUniqueInput, { nullable: false })
  @Type(() => UploadSessionWhereUniqueInput)
  where!: Prisma.AtLeast<UploadSessionWhereUniqueInput, 'id' | 'storageUploadId' | 'fileId'>;

  @Field(() => UploadSessionCreateWithoutChunksInput, { nullable: false })
  @Type(() => UploadSessionCreateWithoutChunksInput)
  create!: UploadSessionCreateWithoutChunksInput;
}
