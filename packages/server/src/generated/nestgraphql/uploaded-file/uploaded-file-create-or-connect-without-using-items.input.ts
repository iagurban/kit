import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadedFileCreateWithoutUsingItemsInput } from './uploaded-file-create-without-using-items.input';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@InputType()
export class UploadedFileCreateOrConnectWithoutUsingItemsInput {
  @Field(() => UploadedFileWhereUniqueInput, { nullable: false })
  @Type(() => UploadedFileWhereUniqueInput)
  where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

  @Field(() => UploadedFileCreateWithoutUsingItemsInput, { nullable: false })
  @Type(() => UploadedFileCreateWithoutUsingItemsInput)
  create!: UploadedFileCreateWithoutUsingItemsInput;
}
