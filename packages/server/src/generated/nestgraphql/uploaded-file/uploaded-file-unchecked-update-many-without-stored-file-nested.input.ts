import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UploadedFileCreateWithoutStoredFileInput } from './uploaded-file-create-without-stored-file.input';
import { Type } from 'class-transformer';
import { UploadedFileCreateOrConnectWithoutStoredFileInput } from './uploaded-file-create-or-connect-without-stored-file.input';
import { UploadedFileUpsertWithWhereUniqueWithoutStoredFileInput } from './uploaded-file-upsert-with-where-unique-without-stored-file.input';
import { UploadedFileCreateManyStoredFileInputEnvelope } from './uploaded-file-create-many-stored-file-input-envelope.input';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';
import { UploadedFileUpdateWithWhereUniqueWithoutStoredFileInput } from './uploaded-file-update-with-where-unique-without-stored-file.input';
import { UploadedFileUpdateManyWithWhereWithoutStoredFileInput } from './uploaded-file-update-many-with-where-without-stored-file.input';
import { UploadedFileScalarWhereInput } from './uploaded-file-scalar-where.input';

@InputType()
export class UploadedFileUncheckedUpdateManyWithoutStoredFileNestedInput {

    @Field(() => [UploadedFileCreateWithoutStoredFileInput], {nullable:true})
    @Type(() => UploadedFileCreateWithoutStoredFileInput)
    create?: Array<UploadedFileCreateWithoutStoredFileInput>;

    @Field(() => [UploadedFileCreateOrConnectWithoutStoredFileInput], {nullable:true})
    @Type(() => UploadedFileCreateOrConnectWithoutStoredFileInput)
    connectOrCreate?: Array<UploadedFileCreateOrConnectWithoutStoredFileInput>;

    @Field(() => [UploadedFileUpsertWithWhereUniqueWithoutStoredFileInput], {nullable:true})
    @Type(() => UploadedFileUpsertWithWhereUniqueWithoutStoredFileInput)
    upsert?: Array<UploadedFileUpsertWithWhereUniqueWithoutStoredFileInput>;

    @Field(() => UploadedFileCreateManyStoredFileInputEnvelope, {nullable:true})
    @Type(() => UploadedFileCreateManyStoredFileInputEnvelope)
    createMany?: UploadedFileCreateManyStoredFileInputEnvelope;

    @Field(() => [UploadedFileWhereUniqueInput], {nullable:true})
    @Type(() => UploadedFileWhereUniqueInput)
    set?: Array<Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>>;

    @Field(() => [UploadedFileWhereUniqueInput], {nullable:true})
    @Type(() => UploadedFileWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>>;

    @Field(() => [UploadedFileWhereUniqueInput], {nullable:true})
    @Type(() => UploadedFileWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>>;

    @Field(() => [UploadedFileWhereUniqueInput], {nullable:true})
    @Type(() => UploadedFileWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>>;

    @Field(() => [UploadedFileUpdateWithWhereUniqueWithoutStoredFileInput], {nullable:true})
    @Type(() => UploadedFileUpdateWithWhereUniqueWithoutStoredFileInput)
    update?: Array<UploadedFileUpdateWithWhereUniqueWithoutStoredFileInput>;

    @Field(() => [UploadedFileUpdateManyWithWhereWithoutStoredFileInput], {nullable:true})
    @Type(() => UploadedFileUpdateManyWithWhereWithoutStoredFileInput)
    updateMany?: Array<UploadedFileUpdateManyWithWhereWithoutStoredFileInput>;

    @Field(() => [UploadedFileScalarWhereInput], {nullable:true})
    @Type(() => UploadedFileScalarWhereInput)
    deleteMany?: Array<UploadedFileScalarWhereInput>;
}
