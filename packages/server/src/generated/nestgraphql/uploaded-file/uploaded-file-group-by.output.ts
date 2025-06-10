import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { UploadedFileCountAggregate } from './uploaded-file-count-aggregate.output';
import { UploadedFileMinAggregate } from './uploaded-file-min-aggregate.output';
import { UploadedFileMaxAggregate } from './uploaded-file-max-aggregate.output';

@ObjectType()
export class UploadedFileGroupBy {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    originalName!: string;

    @Field(() => String, {nullable:false})
    mimetype!: string;

    @Field(() => Date, {nullable:false})
    uploadedAt!: Date | string;

    @Field(() => String, {nullable:false})
    uploaderId!: string;

    @Field(() => String, {nullable:false})
    storedFileId!: string;

    @Field(() => String, {nullable:false})
    menuId!: string;

    @Field(() => UploadedFileCountAggregate, {nullable:true})
    _count?: UploadedFileCountAggregate;

    @Field(() => UploadedFileMinAggregate, {nullable:true})
    _min?: UploadedFileMinAggregate;

    @Field(() => UploadedFileMaxAggregate, {nullable:true})
    _max?: UploadedFileMaxAggregate;
}
