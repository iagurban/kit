import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadSessionCreateInput } from './upload-session-create.input';
import { UploadSessionUpdateInput } from './upload-session-update.input';
import { UploadSessionWhereUniqueInput } from './upload-session-where-unique.input';

@ArgsType()
export class UpsertOneUploadSessionArgs {
  @Field(() => UploadSessionWhereUniqueInput, { nullable: false })
  @Type(() => UploadSessionWhereUniqueInput)
  where!: Prisma.AtLeast<UploadSessionWhereUniqueInput, 'id' | 'storageUploadId' | 'fileId'>;

  @Field(() => UploadSessionCreateInput, { nullable: false })
  @Type(() => UploadSessionCreateInput)
  create!: UploadSessionCreateInput;

  @Field(() => UploadSessionUpdateInput, { nullable: false })
  @Type(() => UploadSessionUpdateInput)
  update!: UploadSessionUpdateInput;
}
