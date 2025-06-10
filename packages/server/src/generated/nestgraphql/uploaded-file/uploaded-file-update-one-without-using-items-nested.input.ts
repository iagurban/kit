import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UploadedFileCreateWithoutUsingItemsInput } from './uploaded-file-create-without-using-items.input';
import { Type } from 'class-transformer';
import { UploadedFileCreateOrConnectWithoutUsingItemsInput } from './uploaded-file-create-or-connect-without-using-items.input';
import { UploadedFileUpsertWithoutUsingItemsInput } from './uploaded-file-upsert-without-using-items.input';
import { UploadedFileWhereInput } from './uploaded-file-where.input';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';
import { UploadedFileUpdateToOneWithWhereWithoutUsingItemsInput } from './uploaded-file-update-to-one-with-where-without-using-items.input';

@InputType()
export class UploadedFileUpdateOneWithoutUsingItemsNestedInput {

    @Field(() => UploadedFileCreateWithoutUsingItemsInput, {nullable:true})
    @Type(() => UploadedFileCreateWithoutUsingItemsInput)
    create?: UploadedFileCreateWithoutUsingItemsInput;

    @Field(() => UploadedFileCreateOrConnectWithoutUsingItemsInput, {nullable:true})
    @Type(() => UploadedFileCreateOrConnectWithoutUsingItemsInput)
    connectOrCreate?: UploadedFileCreateOrConnectWithoutUsingItemsInput;

    @Field(() => UploadedFileUpsertWithoutUsingItemsInput, {nullable:true})
    @Type(() => UploadedFileUpsertWithoutUsingItemsInput)
    upsert?: UploadedFileUpsertWithoutUsingItemsInput;

    @Field(() => UploadedFileWhereInput, {nullable:true})
    @Type(() => UploadedFileWhereInput)
    disconnect?: UploadedFileWhereInput;

    @Field(() => UploadedFileWhereInput, {nullable:true})
    @Type(() => UploadedFileWhereInput)
    delete?: UploadedFileWhereInput;

    @Field(() => UploadedFileWhereUniqueInput, {nullable:true})
    @Type(() => UploadedFileWhereUniqueInput)
    connect?: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

    @Field(() => UploadedFileUpdateToOneWithWhereWithoutUsingItemsInput, {nullable:true})
    @Type(() => UploadedFileUpdateToOneWithWhereWithoutUsingItemsInput)
    update?: UploadedFileUpdateToOneWithWhereWithoutUsingItemsInput;
}
