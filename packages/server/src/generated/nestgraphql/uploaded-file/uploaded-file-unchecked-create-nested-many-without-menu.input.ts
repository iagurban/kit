import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UploadedFileCreateWithoutMenuInput } from './uploaded-file-create-without-menu.input';
import { Type } from 'class-transformer';
import { UploadedFileCreateOrConnectWithoutMenuInput } from './uploaded-file-create-or-connect-without-menu.input';
import { UploadedFileCreateManyMenuInputEnvelope } from './uploaded-file-create-many-menu-input-envelope.input';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@InputType()
export class UploadedFileUncheckedCreateNestedManyWithoutMenuInput {

    @Field(() => [UploadedFileCreateWithoutMenuInput], {nullable:true})
    @Type(() => UploadedFileCreateWithoutMenuInput)
    create?: Array<UploadedFileCreateWithoutMenuInput>;

    @Field(() => [UploadedFileCreateOrConnectWithoutMenuInput], {nullable:true})
    @Type(() => UploadedFileCreateOrConnectWithoutMenuInput)
    connectOrCreate?: Array<UploadedFileCreateOrConnectWithoutMenuInput>;

    @Field(() => UploadedFileCreateManyMenuInputEnvelope, {nullable:true})
    @Type(() => UploadedFileCreateManyMenuInputEnvelope)
    createMany?: UploadedFileCreateManyMenuInputEnvelope;

    @Field(() => [UploadedFileWhereUniqueInput], {nullable:true})
    @Type(() => UploadedFileWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>>;
}
