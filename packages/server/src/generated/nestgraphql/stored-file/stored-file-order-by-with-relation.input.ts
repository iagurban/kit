import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UploadedFileOrderByRelationAggregateInput } from '../uploaded-file/uploaded-file-order-by-relation-aggregate.input';
import { Type } from 'class-transformer';

@InputType()
export class StoredFileOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    hash?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    size?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;

    @Field(() => UploadedFileOrderByRelationAggregateInput, {nullable:true})
    @Type(() => UploadedFileOrderByRelationAggregateInput)
    uploads?: UploadedFileOrderByRelationAggregateInput;
}
