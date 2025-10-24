import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { UploadSessionOrderByWithRelationInput } from './upload-session-order-by-with-relation.input';
import { UploadSessionScalarFieldEnum } from './upload-session-scalar-field.enum';
import { UploadSessionWhereInput } from './upload-session-where.input';
import { UploadSessionWhereUniqueInput } from './upload-session-where-unique.input';

@ArgsType()
export class FindFirstUploadSessionOrThrowArgs {
  @Field(() => UploadSessionWhereInput, { nullable: true })
  @Type(() => UploadSessionWhereInput)
  where?: UploadSessionWhereInput;

  @Field(() => [UploadSessionOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<UploadSessionOrderByWithRelationInput>;

  @Field(() => UploadSessionWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<UploadSessionWhereUniqueInput, 'id' | 'storageUploadId' | 'fileId'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [UploadSessionScalarFieldEnum], { nullable: true })
  distinct?: Array<`${UploadSessionScalarFieldEnum}`>;
}
