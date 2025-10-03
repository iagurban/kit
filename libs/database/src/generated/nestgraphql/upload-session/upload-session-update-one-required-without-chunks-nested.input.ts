import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadSessionCreateOrConnectWithoutChunksInput } from './upload-session-create-or-connect-without-chunks.input';
import { UploadSessionCreateWithoutChunksInput } from './upload-session-create-without-chunks.input';
import { UploadSessionUpdateToOneWithWhereWithoutChunksInput } from './upload-session-update-to-one-with-where-without-chunks.input';
import { UploadSessionUpsertWithoutChunksInput } from './upload-session-upsert-without-chunks.input';
import { UploadSessionWhereUniqueInput } from './upload-session-where-unique.input';

@InputType()
export class UploadSessionUpdateOneRequiredWithoutChunksNestedInput {
  @Field(() => UploadSessionCreateWithoutChunksInput, { nullable: true })
  @Type(() => UploadSessionCreateWithoutChunksInput)
  create?: UploadSessionCreateWithoutChunksInput;

  @Field(() => UploadSessionCreateOrConnectWithoutChunksInput, { nullable: true })
  @Type(() => UploadSessionCreateOrConnectWithoutChunksInput)
  connectOrCreate?: UploadSessionCreateOrConnectWithoutChunksInput;

  @Field(() => UploadSessionUpsertWithoutChunksInput, { nullable: true })
  @Type(() => UploadSessionUpsertWithoutChunksInput)
  upsert?: UploadSessionUpsertWithoutChunksInput;

  @Field(() => UploadSessionWhereUniqueInput, { nullable: true })
  @Type(() => UploadSessionWhereUniqueInput)
  connect?: Prisma.AtLeast<UploadSessionWhereUniqueInput, 'id' | 'storageUploadId' | 'fileId'>;

  @Field(() => UploadSessionUpdateToOneWithWhereWithoutChunksInput, { nullable: true })
  @Type(() => UploadSessionUpdateToOneWithWhereWithoutChunksInput)
  update?: UploadSessionUpdateToOneWithWhereWithoutChunksInput;
}
