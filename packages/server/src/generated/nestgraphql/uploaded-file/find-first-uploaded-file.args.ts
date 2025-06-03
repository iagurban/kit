import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadedFileOrderByWithRelationInput } from './uploaded-file-order-by-with-relation.input';
import { UploadedFileScalarFieldEnum } from './uploaded-file-scalar-field.enum';
import { UploadedFileWhereInput } from './uploaded-file-where.input';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@ArgsType()
export class FindFirstUploadedFileArgs {
  @Field(() => UploadedFileWhereInput, { nullable: true })
  @Type(() => UploadedFileWhereInput)
  where?: UploadedFileWhereInput;

  @Field(() => [UploadedFileOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<UploadedFileOrderByWithRelationInput>;

  @Field(() => UploadedFileWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [UploadedFileScalarFieldEnum], { nullable: true })
  distinct?: Array<`${UploadedFileScalarFieldEnum}`>;
}
