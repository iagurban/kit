import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadSessionCreateOrConnectWithoutFileInput } from './upload-session-create-or-connect-without-file.input';
import { UploadSessionCreateWithoutFileInput } from './upload-session-create-without-file.input';
import { UploadSessionUpdateToOneWithWhereWithoutFileInput } from './upload-session-update-to-one-with-where-without-file.input';
import { UploadSessionUpsertWithoutFileInput } from './upload-session-upsert-without-file.input';
import { UploadSessionWhereInput } from './upload-session-where.input';
import { UploadSessionWhereUniqueInput } from './upload-session-where-unique.input';

@InputType()
export class UploadSessionUncheckedUpdateOneWithoutFileNestedInput {
  @Field(() => UploadSessionCreateWithoutFileInput, { nullable: true })
  @Type(() => UploadSessionCreateWithoutFileInput)
  create?: UploadSessionCreateWithoutFileInput;

  @Field(() => UploadSessionCreateOrConnectWithoutFileInput, { nullable: true })
  @Type(() => UploadSessionCreateOrConnectWithoutFileInput)
  connectOrCreate?: UploadSessionCreateOrConnectWithoutFileInput;

  @Field(() => UploadSessionUpsertWithoutFileInput, { nullable: true })
  @Type(() => UploadSessionUpsertWithoutFileInput)
  upsert?: UploadSessionUpsertWithoutFileInput;

  @Field(() => UploadSessionWhereInput, { nullable: true })
  @Type(() => UploadSessionWhereInput)
  disconnect?: UploadSessionWhereInput;

  @Field(() => UploadSessionWhereInput, { nullable: true })
  @Type(() => UploadSessionWhereInput)
  delete?: UploadSessionWhereInput;

  @Field(() => UploadSessionWhereUniqueInput, { nullable: true })
  @Type(() => UploadSessionWhereUniqueInput)
  connect?: Prisma.AtLeast<UploadSessionWhereUniqueInput, 'id' | 'storageUploadId' | 'fileId'>;

  @Field(() => UploadSessionUpdateToOneWithWhereWithoutFileInput, { nullable: true })
  @Type(() => UploadSessionUpdateToOneWithWhereWithoutFileInput)
  update?: UploadSessionUpdateToOneWithWhereWithoutFileInput;
}
