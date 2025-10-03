import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadSessionUpdateInput } from './upload-session-update.input';
import { UploadSessionWhereUniqueInput } from './upload-session-where-unique.input';

@ArgsType()
export class UpdateOneUploadSessionArgs {
  @Field(() => UploadSessionUpdateInput, { nullable: false })
  @Type(() => UploadSessionUpdateInput)
  data!: UploadSessionUpdateInput;

  @Field(() => UploadSessionWhereUniqueInput, { nullable: false })
  @Type(() => UploadSessionWhereUniqueInput)
  where!: Prisma.AtLeast<UploadSessionWhereUniqueInput, 'id' | 'storageUploadId' | 'fileId'>;
}
