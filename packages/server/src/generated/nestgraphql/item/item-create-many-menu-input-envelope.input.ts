import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemCreateManyMenuInput } from './item-create-many-menu.input';
import { Type } from 'class-transformer';

@InputType()
export class ItemCreateManyMenuInputEnvelope {

    @Field(() => [ItemCreateManyMenuInput], {nullable:false})
    @Type(() => ItemCreateManyMenuInput)
    data!: Array<ItemCreateManyMenuInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
