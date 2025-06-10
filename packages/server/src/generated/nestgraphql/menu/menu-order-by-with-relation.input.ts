import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { ItemOrderByRelationAggregateInput } from '../item/item-order-by-relation-aggregate.input';
import { Type } from 'class-transformer';
import { TagOrderByRelationAggregateInput } from '../tag/tag-order-by-relation-aggregate.input';
import { UploadedFileOrderByRelationAggregateInput } from '../uploaded-file/uploaded-file-order-by-relation-aggregate.input';

@InputType()
export class MenuOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    title?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    ownerId?: `${SortOrder}`;

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    owner?: UserOrderByWithRelationInput;

    @Field(() => ItemOrderByRelationAggregateInput, {nullable:true})
    @Type(() => ItemOrderByRelationAggregateInput)
    items?: ItemOrderByRelationAggregateInput;

    @Field(() => TagOrderByRelationAggregateInput, {nullable:true})
    tags?: TagOrderByRelationAggregateInput;

    @Field(() => UploadedFileOrderByRelationAggregateInput, {nullable:true})
    @Type(() => UploadedFileOrderByRelationAggregateInput)
    files?: UploadedFileOrderByRelationAggregateInput;
}
