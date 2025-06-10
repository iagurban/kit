import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StoredFileCreateWithoutUploadsInput } from './stored-file-create-without-uploads.input';
import { Type } from 'class-transformer';
import { StoredFileCreateOrConnectWithoutUploadsInput } from './stored-file-create-or-connect-without-uploads.input';
import { Prisma } from '../../db-client';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@InputType()
export class StoredFileCreateNestedOneWithoutUploadsInput {

    @Field(() => StoredFileCreateWithoutUploadsInput, {nullable:true})
    @Type(() => StoredFileCreateWithoutUploadsInput)
    create?: StoredFileCreateWithoutUploadsInput;

    @Field(() => StoredFileCreateOrConnectWithoutUploadsInput, {nullable:true})
    @Type(() => StoredFileCreateOrConnectWithoutUploadsInput)
    connectOrCreate?: StoredFileCreateOrConnectWithoutUploadsInput;

    @Field(() => StoredFileWhereUniqueInput, {nullable:true})
    @Type(() => StoredFileWhereUniqueInput)
    connect?: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id'>;
}
