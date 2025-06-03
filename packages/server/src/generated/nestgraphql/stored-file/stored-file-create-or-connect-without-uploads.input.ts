import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { StoredFileCreateWithoutUploadsInput } from './stored-file-create-without-uploads.input';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@InputType()
export class StoredFileCreateOrConnectWithoutUploadsInput {
  @Field(() => StoredFileWhereUniqueInput, { nullable: false })
  @Type(() => StoredFileWhereUniqueInput)
  where!: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id'>;

  @Field(() => StoredFileCreateWithoutUploadsInput, { nullable: false })
  @Type(() => StoredFileCreateWithoutUploadsInput)
  create!: StoredFileCreateWithoutUploadsInput;
}
