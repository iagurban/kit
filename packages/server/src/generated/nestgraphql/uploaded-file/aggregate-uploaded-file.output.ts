import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { UploadedFileCountAggregate } from './uploaded-file-count-aggregate.output';
import { UploadedFileMinAggregate } from './uploaded-file-min-aggregate.output';
import { UploadedFileMaxAggregate } from './uploaded-file-max-aggregate.output';

@ObjectType()
export class AggregateUploadedFile {

    @Field(() => UploadedFileCountAggregate, {nullable:true})
    _count?: UploadedFileCountAggregate;

    @Field(() => UploadedFileMinAggregate, {nullable:true})
    _min?: UploadedFileMinAggregate;

    @Field(() => UploadedFileMaxAggregate, {nullable:true})
    _max?: UploadedFileMaxAggregate;
}
