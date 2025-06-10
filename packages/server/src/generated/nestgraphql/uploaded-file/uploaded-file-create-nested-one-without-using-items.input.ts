import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UploadedFileCreateWithoutUsingItemsInput } from './uploaded-file-create-without-using-items.input';
import { Type } from 'class-transformer';
import { UploadedFileCreateOrConnectWithoutUsingItemsInput } from './uploaded-file-create-or-connect-without-using-items.input';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@InputType()
export class UploadedFileCreateNestedOneWithoutUsingItemsInput {

    @Field(() => UploadedFileCreateWithoutUsingItemsInput, {nullable:true})
    @Type(() => UploadedFileCreateWithoutUsingItemsInput)
    create?: UploadedFileCreateWithoutUsingItemsInput;

    @Field(() => UploadedFileCreateOrConnectWithoutUsingItemsInput, {nullable:true})
    @Type(() => UploadedFileCreateOrConnectWithoutUsingItemsInput)
    connectOrCreate?: UploadedFileCreateOrConnectWithoutUsingItemsInput;

    @Field(() => UploadedFileWhereUniqueInput, {nullable:true})
    @Type(() => UploadedFileWhereUniqueInput)
    connect?: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;
}
