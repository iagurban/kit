import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';
import { Type } from 'class-transformer';
import { UploadedFileCreateWithoutUsingItemsInput } from './uploaded-file-create-without-using-items.input';

@InputType()
export class UploadedFileCreateOrConnectWithoutUsingItemsInput {

    @Field(() => UploadedFileWhereUniqueInput, {nullable:false})
    @Type(() => UploadedFileWhereUniqueInput)
    where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

    @Field(() => UploadedFileCreateWithoutUsingItemsInput, {nullable:false})
    @Type(() => UploadedFileCreateWithoutUsingItemsInput)
    create!: UploadedFileCreateWithoutUsingItemsInput;
}
