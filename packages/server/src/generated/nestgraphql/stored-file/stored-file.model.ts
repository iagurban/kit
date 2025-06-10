import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UploadedFile } from '../uploaded-file/uploaded-file.model';
import { StoredFileCount } from './stored-file-count.output';

@ObjectType()
export class StoredFile {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    hash!: string;

    @Field(() => Int, {nullable:false})
    size!: number;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => [UploadedFile], {nullable:true})
    uploads?: Array<UploadedFile>;

    @Field(() => StoredFileCount, {nullable:false})
    _count?: StoredFileCount;
}
