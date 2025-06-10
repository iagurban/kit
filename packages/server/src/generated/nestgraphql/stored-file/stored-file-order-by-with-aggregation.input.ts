import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { StoredFileCountOrderByAggregateInput } from './stored-file-count-order-by-aggregate.input';
import { StoredFileAvgOrderByAggregateInput } from './stored-file-avg-order-by-aggregate.input';
import { StoredFileMaxOrderByAggregateInput } from './stored-file-max-order-by-aggregate.input';
import { StoredFileMinOrderByAggregateInput } from './stored-file-min-order-by-aggregate.input';
import { StoredFileSumOrderByAggregateInput } from './stored-file-sum-order-by-aggregate.input';

@InputType()
export class StoredFileOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    hash?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    size?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;

    @Field(() => StoredFileCountOrderByAggregateInput, {nullable:true})
    _count?: StoredFileCountOrderByAggregateInput;

    @Field(() => StoredFileAvgOrderByAggregateInput, {nullable:true})
    _avg?: StoredFileAvgOrderByAggregateInput;

    @Field(() => StoredFileMaxOrderByAggregateInput, {nullable:true})
    _max?: StoredFileMaxOrderByAggregateInput;

    @Field(() => StoredFileMinOrderByAggregateInput, {nullable:true})
    _min?: StoredFileMinOrderByAggregateInput;

    @Field(() => StoredFileSumOrderByAggregateInput, {nullable:true})
    _sum?: StoredFileSumOrderByAggregateInput;
}
