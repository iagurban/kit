import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { StoredFileCreateOrConnectWithoutUploadsInput } from './stored-file-create-or-connect-without-uploads.input';
import { StoredFileCreateWithoutUploadsInput } from './stored-file-create-without-uploads.input';
import { StoredFileUpdateToOneWithWhereWithoutUploadsInput } from './stored-file-update-to-one-with-where-without-uploads.input';
import { StoredFileUpsertWithoutUploadsInput } from './stored-file-upsert-without-uploads.input';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@InputType()
export class StoredFileUpdateOneRequiredWithoutUploadsNestedInput {
  @Field(() => StoredFileCreateWithoutUploadsInput, { nullable: true })
  @Type(() => StoredFileCreateWithoutUploadsInput)
  create?: StoredFileCreateWithoutUploadsInput;

  @Field(() => StoredFileCreateOrConnectWithoutUploadsInput, { nullable: true })
  @Type(() => StoredFileCreateOrConnectWithoutUploadsInput)
  connectOrCreate?: StoredFileCreateOrConnectWithoutUploadsInput;

  @Field(() => StoredFileUpsertWithoutUploadsInput, { nullable: true })
  @Type(() => StoredFileUpsertWithoutUploadsInput)
  upsert?: StoredFileUpsertWithoutUploadsInput;

  @Field(() => StoredFileWhereUniqueInput, { nullable: true })
  @Type(() => StoredFileWhereUniqueInput)
  connect?: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id'>;

  @Field(() => StoredFileUpdateToOneWithWhereWithoutUploadsInput, { nullable: true })
  @Type(() => StoredFileUpdateToOneWithWhereWithoutUploadsInput)
  update?: StoredFileUpdateToOneWithWhereWithoutUploadsInput;
}
