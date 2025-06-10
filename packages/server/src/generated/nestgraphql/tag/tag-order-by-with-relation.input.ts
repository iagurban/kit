import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { MenuOrderByWithRelationInput } from '../menu/menu-order-by-with-relation.input';
import { Type } from 'class-transformer';

@InputType()
export class TagOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    menuId?: `${SortOrder}`;

    @Field(() => MenuOrderByWithRelationInput, {nullable:true})
    @Type(() => MenuOrderByWithRelationInput)
    menu?: MenuOrderByWithRelationInput;
}
