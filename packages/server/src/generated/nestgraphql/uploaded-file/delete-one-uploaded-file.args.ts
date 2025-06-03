import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@ArgsType()
export class DeleteOneUploadedFileArgs {
  @Field(() => UploadedFileWhereUniqueInput, { nullable: false })
  @Type(() => UploadedFileWhereUniqueInput)
  where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;
}
