import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadSessionCreateWithoutFileInput } from './upload-session-create-without-file.input';
import { UploadSessionWhereUniqueInput } from './upload-session-where-unique.input';

@InputType()
export class UploadSessionCreateOrConnectWithoutFileInput {
  @Field(() => UploadSessionWhereUniqueInput, { nullable: false })
  @Type(() => UploadSessionWhereUniqueInput)
  where!: Prisma.AtLeast<UploadSessionWhereUniqueInput, 'id' | 'storageUploadId' | 'fileId'>;

  @Field(() => UploadSessionCreateWithoutFileInput, { nullable: false })
  @Type(() => UploadSessionCreateWithoutFileInput)
  create!: UploadSessionCreateWithoutFileInput;
}
