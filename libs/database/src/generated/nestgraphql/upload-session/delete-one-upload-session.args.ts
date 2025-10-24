import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UploadSessionWhereUniqueInput } from './upload-session-where-unique.input';

@ArgsType()
export class DeleteOneUploadSessionArgs {
  @Field(() => UploadSessionWhereUniqueInput, { nullable: false })
  @Type(() => UploadSessionWhereUniqueInput)
  where!: Prisma.AtLeast<UploadSessionWhereUniqueInput, 'id' | 'storageUploadId' | 'fileId'>;
}
