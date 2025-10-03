import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadSessionCreateOrConnectWithoutFileInput } from './upload-session-create-or-connect-without-file.input';
import { UploadSessionCreateWithoutFileInput } from './upload-session-create-without-file.input';
import { UploadSessionWhereUniqueInput } from './upload-session-where-unique.input';

@InputType()
export class UploadSessionUncheckedCreateNestedOneWithoutFileInput {
  @Field(() => UploadSessionCreateWithoutFileInput, { nullable: true })
  @Type(() => UploadSessionCreateWithoutFileInput)
  create?: UploadSessionCreateWithoutFileInput;

  @Field(() => UploadSessionCreateOrConnectWithoutFileInput, { nullable: true })
  @Type(() => UploadSessionCreateOrConnectWithoutFileInput)
  connectOrCreate?: UploadSessionCreateOrConnectWithoutFileInput;

  @Field(() => UploadSessionWhereUniqueInput, { nullable: true })
  @Type(() => UploadSessionWhereUniqueInput)
  connect?: Prisma.AtLeast<UploadSessionWhereUniqueInput, 'id' | 'storageUploadId' | 'fileId'>;
}
