import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { MenuOrderByRelationAggregateInput } from '../menu/menu-order-by-relation-aggregate.input';
import { Type } from 'class-transformer';
import { UploadedFileOrderByRelationAggregateInput } from '../uploaded-file/uploaded-file-order-by-relation-aggregate.input';
import { RefreshTokenOrderByRelationAggregateInput } from '../refresh-token/refresh-token-order-by-relation-aggregate.input';

@InputType()
export class UserOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    email?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    passwordHash?: `${SortOrder}`;

    @Field(() => MenuOrderByRelationAggregateInput, {nullable:true})
    @Type(() => MenuOrderByRelationAggregateInput)
    menus?: MenuOrderByRelationAggregateInput;

    @Field(() => UploadedFileOrderByRelationAggregateInput, {nullable:true})
    @Type(() => UploadedFileOrderByRelationAggregateInput)
    uploadedFiles?: UploadedFileOrderByRelationAggregateInput;

    @Field(() => RefreshTokenOrderByRelationAggregateInput, {nullable:true})
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput;
}
