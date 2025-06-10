import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { StoredFileOrderByWithRelationInput } from '../stored-file/stored-file-order-by-with-relation.input';
import { MenuOrderByWithRelationInput } from '../menu/menu-order-by-with-relation.input';
import { Type } from 'class-transformer';
import { ItemOrderByRelationAggregateInput } from '../item/item-order-by-relation-aggregate.input';

@InputType()
export class UploadedFileOrderByWithRelationInput {

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

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    uploader?: UserOrderByWithRelationInput;

    @Field(() => StoredFileOrderByWithRelationInput, {nullable:true})
    storedFile?: StoredFileOrderByWithRelationInput;

    @Field(() => MenuOrderByWithRelationInput, {nullable:true})
    @Type(() => MenuOrderByWithRelationInput)
    menu?: MenuOrderByWithRelationInput;

    @Field(() => ItemOrderByRelationAggregateInput, {nullable:true})
    @Type(() => ItemOrderByRelationAggregateInput)
    usingItems?: ItemOrderByRelationAggregateInput;
}
