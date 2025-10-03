import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadSessionCreateOrConnectWithoutChunksInput } from './upload-session-create-or-connect-without-chunks.input';
import { UploadSessionCreateWithoutChunksInput } from './upload-session-create-without-chunks.input';
import { UploadSessionWhereUniqueInput } from './upload-session-where-unique.input';

@InputType()
export class UploadSessionCreateNestedOneWithoutChunksInput {
  @Field(() => UploadSessionCreateWithoutChunksInput, { nullable: true })
  @Type(() => UploadSessionCreateWithoutChunksInput)
  create?: UploadSessionCreateWithoutChunksInput;

  @Field(() => UploadSessionCreateOrConnectWithoutChunksInput, { nullable: true })
  @Type(() => UploadSessionCreateOrConnectWithoutChunksInput)
  connectOrCreate?: UploadSessionCreateOrConnectWithoutChunksInput;

  @Field(() => UploadSessionWhereUniqueInput, { nullable: true })
  @Type(() => UploadSessionWhereUniqueInput)
  connect?: Prisma.AtLeast<UploadSessionWhereUniqueInput, 'id' | 'storageUploadId' | 'fileId'>;
}
