import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';
import { Type } from 'class-transformer';
import { StoredFileCreateWithoutUploadsInput } from './stored-file-create-without-uploads.input';

@InputType()
export class StoredFileCreateOrConnectWithoutUploadsInput {

    @Field(() => StoredFileWhereUniqueInput, {nullable:false})
    @Type(() => StoredFileWhereUniqueInput)
    where!: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id'>;

    @Field(() => StoredFileCreateWithoutUploadsInput, {nullable:false})
    @Type(() => StoredFileCreateWithoutUploadsInput)
    create!: StoredFileCreateWithoutUploadsInput;
}
