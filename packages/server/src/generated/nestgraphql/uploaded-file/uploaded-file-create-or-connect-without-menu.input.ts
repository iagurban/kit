import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadedFileCreateWithoutMenuInput } from './uploaded-file-create-without-menu.input';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@InputType()
export class UploadedFileCreateOrConnectWithoutMenuInput {
  @Field(() => UploadedFileWhereUniqueInput, { nullable: false })
  @Type(() => UploadedFileWhereUniqueInput)
  where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

  @Field(() => UploadedFileCreateWithoutMenuInput, { nullable: false })
  @Type(() => UploadedFileCreateWithoutMenuInput)
  create!: UploadedFileCreateWithoutMenuInput;
}
