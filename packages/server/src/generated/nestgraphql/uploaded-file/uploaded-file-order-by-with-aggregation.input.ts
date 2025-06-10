import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UploadedFileCountOrderByAggregateInput } from './uploaded-file-count-order-by-aggregate.input';
import { UploadedFileMaxOrderByAggregateInput } from './uploaded-file-max-order-by-aggregate.input';
import { UploadedFileMinOrderByAggregateInput } from './uploaded-file-min-order-by-aggregate.input';

@InputType()
export class UploadedFileOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    originalName?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    mimetype?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    uploadedAt?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    uploaderId?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    storedFileId?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    menuId?: `${SortOrder}`;

    @Field(() => UploadedFileCountOrderByAggregateInput, {nullable:true})
    _count?: UploadedFileCountOrderByAggregateInput;

    @Field(() => UploadedFileMaxOrderByAggregateInput, {nullable:true})
    _max?: UploadedFileMaxOrderByAggregateInput;

    @Field(() => UploadedFileMinOrderByAggregateInput, {nullable:true})
    _min?: UploadedFileMinOrderByAggregateInput;
}
