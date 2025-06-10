import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StoredFileWhereInput } from './stored-file-where.input';
import { Type } from 'class-transformer';
import { StoredFileOrderByWithAggregationInput } from './stored-file-order-by-with-aggregation.input';
import { StoredFileScalarFieldEnum } from './stored-file-scalar-field.enum';
import { StoredFileScalarWhereWithAggregatesInput } from './stored-file-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { StoredFileCountAggregateInput } from './stored-file-count-aggregate.input';
import { StoredFileAvgAggregateInput } from './stored-file-avg-aggregate.input';
import { StoredFileSumAggregateInput } from './stored-file-sum-aggregate.input';
import { StoredFileMinAggregateInput } from './stored-file-min-aggregate.input';
import { StoredFileMaxAggregateInput } from './stored-file-max-aggregate.input';

@ArgsType()
export class StoredFileGroupByArgs {

    @Field(() => StoredFileWhereInput, {nullable:true})
    @Type(() => StoredFileWhereInput)
    where?: StoredFileWhereInput;

    @Field(() => [StoredFileOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<StoredFileOrderByWithAggregationInput>;

    @Field(() => [StoredFileScalarFieldEnum], {nullable:false})
    by!: Array<`${StoredFileScalarFieldEnum}`>;

    @Field(() => StoredFileScalarWhereWithAggregatesInput, {nullable:true})
    having?: StoredFileScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => StoredFileCountAggregateInput, {nullable:true})
    _count?: StoredFileCountAggregateInput;

    @Field(() => StoredFileAvgAggregateInput, {nullable:true})
    _avg?: StoredFileAvgAggregateInput;

    @Field(() => StoredFileSumAggregateInput, {nullable:true})
    _sum?: StoredFileSumAggregateInput;

    @Field(() => StoredFileMinAggregateInput, {nullable:true})
    _min?: StoredFileMinAggregateInput;

    @Field(() => StoredFileMaxAggregateInput, {nullable:true})
    _max?: StoredFileMaxAggregateInput;
}
