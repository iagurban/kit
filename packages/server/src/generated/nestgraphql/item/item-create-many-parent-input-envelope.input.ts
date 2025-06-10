import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemCreateManyParentInput } from './item-create-many-parent.input';
import { Type } from 'class-transformer';

@InputType()
export class ItemCreateManyParentInputEnvelope {

    @Field(() => [ItemCreateManyParentInput], {nullable:false})
    @Type(() => ItemCreateManyParentInput)
    data!: Array<ItemCreateManyParentInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
