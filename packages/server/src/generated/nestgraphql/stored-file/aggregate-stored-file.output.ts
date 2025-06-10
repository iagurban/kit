import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { StoredFileCountAggregate } from './stored-file-count-aggregate.output';
import { StoredFileAvgAggregate } from './stored-file-avg-aggregate.output';
import { StoredFileSumAggregate } from './stored-file-sum-aggregate.output';
import { StoredFileMinAggregate } from './stored-file-min-aggregate.output';
import { StoredFileMaxAggregate } from './stored-file-max-aggregate.output';

@ObjectType()
export class AggregateStoredFile {

    @Field(() => StoredFileCountAggregate, {nullable:true})
    _count?: StoredFileCountAggregate;

    @Field(() => StoredFileAvgAggregate, {nullable:true})
    _avg?: StoredFileAvgAggregate;

    @Field(() => StoredFileSumAggregate, {nullable:true})
    _sum?: StoredFileSumAggregate;

    @Field(() => StoredFileMinAggregate, {nullable:true})
    _min?: StoredFileMinAggregate;

    @Field(() => StoredFileMaxAggregate, {nullable:true})
    _max?: StoredFileMaxAggregate;
}
