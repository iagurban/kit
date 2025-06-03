import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { UploadedFileCreateManyMenuInputEnvelope } from './uploaded-file-create-many-menu-input-envelope.input';
import { UploadedFileCreateOrConnectWithoutMenuInput } from './uploaded-file-create-or-connect-without-menu.input';
import { UploadedFileCreateWithoutMenuInput } from './uploaded-file-create-without-menu.input';
import { UploadedFileScalarWhereInput } from './uploaded-file-scalar-where.input';
import { UploadedFileUpdateManyWithWhereWithoutMenuInput } from './uploaded-file-update-many-with-where-without-menu.input';
import { UploadedFileUpdateWithWhereUniqueWithoutMenuInput } from './uploaded-file-update-with-where-unique-without-menu.input';
import { UploadedFileUpsertWithWhereUniqueWithoutMenuInput } from './uploaded-file-upsert-with-where-unique-without-menu.input';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@InputType()
export class UploadedFileUpdateManyWithoutMenuNestedInput {
  @Field(() => [UploadedFileCreateWithoutMenuInput], { nullable: true })
  @Type(() => UploadedFileCreateWithoutMenuInput)
  create?: Array<UploadedFileCreateWithoutMenuInput>;

  @Field(() => [UploadedFileCreateOrConnectWithoutMenuInput], { nullable: true })
  @Type(() => UploadedFileCreateOrConnectWithoutMenuInput)
  connectOrCreate?: Array<UploadedFileCreateOrConnectWithoutMenuInput>;

  @Field(() => [UploadedFileUpsertWithWhereUniqueWithoutMenuInput], { nullable: true })
  @Type(() => UploadedFileUpsertWithWhereUniqueWithoutMenuInput)
  upsert?: Array<UploadedFileUpsertWithWhereUniqueWithoutMenuInput>;

  @Field(() => UploadedFileCreateManyMenuInputEnvelope, { nullable: true })
  @Type(() => UploadedFileCreateManyMenuInputEnvelope)
  createMany?: UploadedFileCreateManyMenuInputEnvelope;

  @Field(() => [UploadedFileWhereUniqueInput], { nullable: true })
  @Type(() => UploadedFileWhereUniqueInput)
  set?: Array<Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>>;

  @Field(() => [UploadedFileWhereUniqueInput], { nullable: true })
  @Type(() => UploadedFileWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>>;

  @Field(() => [UploadedFileWhereUniqueInput], { nullable: true })
  @Type(() => UploadedFileWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>>;

  @Field(() => [UploadedFileWhereUniqueInput], { nullable: true })
  @Type(() => UploadedFileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>>;

  @Field(() => [UploadedFileUpdateWithWhereUniqueWithoutMenuInput], { nullable: true })
  @Type(() => UploadedFileUpdateWithWhereUniqueWithoutMenuInput)
  update?: Array<UploadedFileUpdateWithWhereUniqueWithoutMenuInput>;

  @Field(() => [UploadedFileUpdateManyWithWhereWithoutMenuInput], { nullable: true })
  @Type(() => UploadedFileUpdateManyWithWhereWithoutMenuInput)
  updateMany?: Array<UploadedFileUpdateManyWithWhereWithoutMenuInput>;

  @Field(() => [UploadedFileScalarWhereInput], { nullable: true })
  @Type(() => UploadedFileScalarWhereInput)
  deleteMany?: Array<UploadedFileScalarWhereInput>;
}
