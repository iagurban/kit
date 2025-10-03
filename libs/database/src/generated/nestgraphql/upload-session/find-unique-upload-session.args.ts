import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadSessionWhereUniqueInput } from './upload-session-where-unique.input';

@ArgsType()
export class FindUniqueUploadSessionArgs {
  @Field(() => UploadSessionWhereUniqueInput, { nullable: false })
  @Type(() => UploadSessionWhereUniqueInput)
  where!: Prisma.AtLeast<UploadSessionWhereUniqueInput, 'id' | 'storageUploadId' | 'fileId'>;
}
