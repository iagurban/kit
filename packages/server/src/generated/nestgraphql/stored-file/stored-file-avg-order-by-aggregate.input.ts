import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class StoredFileAvgOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    size?: `${SortOrder}`;
}
